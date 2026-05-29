## Developer execution pass — 2026-04-05

**SSOT in repo:** [`docs/activation-execution-status.md`](https://github.com/sovereignsquad/impact/blob/main/docs/activation-execution-status.md).

### #34 (this issue) — blocked on maintainer npm auth

- `npm whoami` → **not logged in** on the machine that ran the pass.
- `npm view @doneisbetter/cli` → **404** (not published yet).
- `DRY_RUN=1 npm run publish:npm:dry-run` → **PASS** — all `@doneisbetter/*` **0.3.0** packages pack correctly.

**Next (maintainer):** `npm login` → `npm run publish:npm` → `npm view @doneisbetter/cli` → clean-machine Path C smoke → attach evidence → **Done** when acceptance met.

### Hosted ingest (#58) — Docker verified locally; public URL still needed

- `docker build -f Dockerfile.ingest` → **PASS**.
- **Fix shipped:** `USER node` could not create `/app/data` — image now **`chown`s `/app/data` and `/data`**.
- Container smoke: **`GET /health`**, **`/healthz`**, **`POST` 200**, duplicate **`POST` 409**, **`submission_count` survives `docker restart`**.

**Next:** deploy image to Fly/Railway/etc. with persistent **`IMPACT_INGEST_DB_PATH`**, then set Vercel **`IMPACT_INGEST_UPSTREAM`**.

### #59–#62

Not closed — no public ingest origin, no upstream on Vercel, no volume above privacy threshold for real `/data.html` tables.

---

**Recommendation:** keep **#34** **In Progress** until publish + proof. Keep **#58** **In Progress** until hosted URL + TLS. **#59–#62** stay **Todo** per closure order.
