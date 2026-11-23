import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTheme } from "./theme-provider";

export function ModeToggle(): React.JSX.Element {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size={"icon-xs"}
      variant={"link"}
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <Sun className="size-3 scale-100 dark:scale-0" />{" "}
      <Moon className="absolute size-3 scale-0 dark:scale-100" />
    </Button>
  );
}
