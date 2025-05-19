import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import { BASIC_THEMES, THEMES } from "@/config/themes";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { FaSnowflake } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";

const themeIcons = {
  light: <BsSun size={20} />,
  dark: <BsMoonStars size={18} />,
  winter: <FaSnowflake size={18} />,
  summer: <WiDaySunny size={22} />,
};

/**
 * ThemePicker component
 * @param {('basic'|'all')} variant - 'basic' for light/dark, 'all' for all themes
 * @param {string} value - current theme
 * @param {function} onChange - callback(themeKey)
 */
function ThemePicker({ variant = "basic", value, onChange }) {
  const themeList = variant === "all" ? THEMES : BASIC_THEMES;
  const currentTheme = themeList.find((t) => t.key === value) || themeList[0];

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="theme-picker-toggle"
        style={{
          color: "var(--color-nav-link)",
          padding: "0.5rem",
          border: "none",
          background: "transparent",
          fontSize: "1.2rem",
        }}
        id="theme-picker-dropdown"
      >
        {themeIcons[currentTheme.key]}
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{
          background: "var(--color-card-bg)",
          border: "1px solid var(--color-card-shadow)",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          minWidth: "120px",
        }}
      >
        {themeList.map((theme) => (
          <Dropdown.Item
            key={theme.key}
            active={value === theme.key}
            onClick={() => onChange(theme.key)}
            className="d-flex align-items-center gap-2"
            style={{
              background:
                value === theme.key ? "var(--color-primary)" : "transparent",
              color: value === theme.key ? "#fff" : "var(--color-text)",
              borderRadius: "0.25rem",
              padding: "0.5rem 0.75rem",
              marginBottom: "0.25rem",
              fontSize: "0.9rem",
            }}
          >
            <span>{themeIcons[theme.key]}</span>
            <span>{theme.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

ThemePicker.propTypes = {
  variant: PropTypes.oneOf(["basic", "all"]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThemePicker;
