import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTheme } from "./theme-provider";

export function ModeToggle(): React.JSX.Element {
  const { setTheme, theme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Button
      size={"icon-xs"}
      variant={"link"}
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      <Sun aria-hidden="true" className="size-3 scale-100 dark:scale-0" />
      <Moon aria-hidden="true" className="absolute size-3 scale-0 dark:scale-100" />
    </Button>
  );
}
