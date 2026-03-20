import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BASIC_THEMES, THEMES } from "@/config/themes";
import { Sun, Moon, Snowflake, CloudSun } from "lucide-react";

const themeIcons = {
  light: Sun,
  dark: Moon,
  winter: Snowflake,
  summer: CloudSun,
};

function ThemePicker({ variant = "basic", value, onChange }) {
  const themeList = variant === "all" ? THEMES : BASIC_THEMES;
  const currentTheme = themeList.find((t) => t.key === value) || themeList[0];
  const CurrentIcon = themeIcons[currentTheme.key];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[var(--color-nav-link)] hover:bg-[var(--color-card-shadow)] hover:text-[var(--color-nav-link)] border-none bg-transparent"
        >
          <CurrentIcon className="size-5" />
          <span className="sr-only">Theme picker</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[120px] bg-[var(--color-card-bg)] border-[var(--color-card-shadow)]"
      >
        {themeList.map((theme) => {
          const Icon = themeIcons[theme.key];
          return (
            <DropdownMenuItem
              key={theme.key}
              onClick={() => onChange(theme.key)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                value === theme.key && "bg-[var(--color-primary)] text-white"
              )}
            >
              <Icon className="size-4" />
              {theme.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ThemePicker.propTypes = {
  variant: PropTypes.oneOf(["basic", "all"]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThemePicker;
