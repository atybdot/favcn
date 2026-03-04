import "react";

declare module "react" {
  /**
   * Activity (React 19.2.3+)
   * Keeps children mounted but visually hidden + effects suspended when mode="hidden".
   */
  const Activity: React.FC<{
    children: React.ReactNode;
    mode: "visible" | "hidden";
  }>;
}
