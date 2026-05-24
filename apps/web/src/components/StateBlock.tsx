import { Alert, type AlertProps } from "@mantine/core";
import type { ReactNode } from "react";

export function StateBlock({
  title,
  children,
  variant = "light",
  color = "teal",
  role = "status",
}: {
  title?: string;
  children: ReactNode;
  variant?: AlertProps["variant"];
  color?: AlertProps["color"];
  role?: string;
}) {
  return (
    <Alert variant={variant} color={color} title={title} role={role} mb="md">
      {children}
    </Alert>
  );
}
