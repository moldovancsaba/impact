import { createHash, randomBytes } from "node:crypto";
import os from "node:os";
import type { HostProfile } from "@doneisbetter/schemas";
import { fieldConfidence, pn, ps, pbool, pi } from "@doneisbetter/schemas";
import { execText } from "./exec.js";

function osDisplayName(platform: NodeJS.Platform): string {
  switch (platform) {
    case "darwin":
      return "macOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    case "freebsd":
      return "FreeBSD";
    default:
      return platform;
  }
}

async function freeDiskGb(): Promise<{ gb: number | null; ok: boolean }> {
  const out = await execText("df", ["-k", "/"], 3000);
  if (!out) return { gb: null, ok: false };
  const lines = out.split(/\r?\n/).filter(Boolean);
  const data = lines.find((l) => !l.toLowerCase().startsWith("filesystem"));
  if (!data) return { gb: null, ok: false };
  const parts = data.trim().split(/\s+/);
  const availKb = Number(parts[parts.length - 3]);
  if (!Number.isFinite(availKb)) return { gb: null, ok: false };
  return { gb: Math.round(availKb / 1e6), ok: true };
}

function metalHint(platform: NodeJS.Platform, arch: string, chip: string | null): boolean | null {
  if (platform !== "darwin") return null;
  if (arch === "arm64") return true;
  const c = chip?.toLowerCase() ?? "";
  if (c.includes("apple m")) return true;
  return false;
}

function deriveMachineClass(chip: string | null, memoryGb: number | null, arch: string): string {
  const mem = memoryGb != null ? `${memoryGb}gb` : "unknown_mem";
  const chipSlug = (chip ?? "unknown_chip")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
  return `${chipSlug}_${mem}_${arch}`.replace(/__+/g, "_");
}

export function fingerprintHost(
  salt: string,
  input: {
    os_name: string;
    os_version: string;
    architecture: string;
    chip: string | null;
    memory_gb: number | null;
  }
): string {
  const canonical = JSON.stringify({
    os_name: input.os_name,
    os_version: input.os_version,
    architecture: input.architecture,
    chip: input.chip,
    memory_gb: input.memory_gb,
    salt,
  });
  const hash = createHash("sha256").update(canonical).digest("hex");
  return `sha256:${hash}`;
}

export async function scanHost(salt: string): Promise<HostProfile> {
  const platform = os.platform();
  const arch = os.arch();
  const cpus = os.cpus();
  const first = cpus[0];
  const chip = first?.model?.trim() || null;
  const coreCount = cpus.length > 0 ? cpus.length : null;
  const memoryBytes = os.totalmem();
  const memoryGb = memoryBytes > 0 ? Math.max(1, Math.round(memoryBytes / 1024 ** 3)) : null;

  const osName = osDisplayName(platform);
  const osVersion = os.release();

  const diskResult = await freeDiskGb();
  const diskProbe = "df -k /";
  const diskConf = diskResult.ok
    ? fieldConfidence("host_disk_df_success")
    : fieldConfidence("host_disk_df_fail");
  const diskField = pn(diskResult.gb, "command", diskProbe, diskConf);

  const hostPartial = {
    os_name: osName,
    os_version: osVersion,
    architecture: arch,
    chip,
    memory_gb: memoryGb,
    core_count: coreCount,
  };

  const fingerprint_hash = fingerprintHost(salt, {
    os_name: hostPartial.os_name,
    os_version: hostPartial.os_version,
    architecture: hostPartial.architecture,
    chip: hostPartial.chip,
    memory_gb: hostPartial.memory_gb,
  });

  const metal = metalHint(platform, arch, chip);
  const machineClass = deriveMachineClass(chip, memoryGb, arch);

  const chipConf = chip ? fieldConfidence("host_chip_from_cpus") : fieldConfidence("host_chip_absent");

  return {
    machine_class: ps(machineClass, "derived", "impact:machine_class", fieldConfidence("host_machine_class")),
    fingerprint_hash: ps(fingerprint_hash, "derived", "impact:fingerprint_host_v0", fieldConfidence("host_fingerprint")),
    os_name: ps(osName, "derived", "node:os.platform+mapping", fieldConfidence("host_os_mapping")),
    os_version: ps(osVersion, "derived", "node:os.release", fieldConfidence("host_os_release")),
    architecture: ps(arch, "derived", "node:os.arch", fieldConfidence("host_arch")),
    chip: ps(chip, "derived", "node:os.cpus[0].model", chipConf),
    memory_gb: pn(memoryGb, "derived", "node:os.totalmem", fieldConfidence("host_memory")),
    core_count: pi(coreCount, "derived", "node:os.cpus.length", fieldConfidence("host_core_count")),
    gpu_acceleration:
      platform === "darwin"
        ? {
            metal_available: pbool(
              metal,
              "derived",
              "impact:metal_hint_darwin",
              metal === null ? fieldConfidence("host_disk_df_fail") : fieldConfidence("host_metal_hint")
            ),
          }
        : {
            metal_available: pbool(null, "unknown", null, fieldConfidence("host_disk_df_fail")),
          },
    disk: { free_gb: diskField },
  };
}

export function generateLocalSalt(): string {
  return randomBytes(16).toString("hex");
}
