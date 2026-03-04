import { useState, useCallback } from "react";

export type PackageManager = "bun" | "pnpm" | "npm";

const STORAGE_KEY = "favcn-pm";

export function usePackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const [pm, setPmState] = useState<PackageManager>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "bun" || stored === "pnpm" || stored === "npm") return stored;
    } catch {
      /* SSR or blocked storage */
    }
    return "npm";
  });

  const setPm = useCallback((next: PackageManager) => {
    setPmState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* blocked storage */
    }
  }, []);

  return [pm, setPm];
}
