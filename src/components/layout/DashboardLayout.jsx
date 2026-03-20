import { Link, Outlet, useLocation, useNavigate } from "react-router";
import ThemePicker from "@/components/ui/ThemePicker";
import { useTheme } from "@/hooks/useTheme";
import {
  Home,
  Search,
  Map,
  MapPin,
  Star,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/search/coordinates", icon: Search, label: "Search by Coordinates" },
  { path: "/search/city", icon: Search, label: "Search by City" },
  { path: "/map", icon: Map, label: "Map Selector" },
  {
    path: "#",
    icon: MapPin,
    label: "Current Location",
    onClick: (navigate) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lon = position.coords.longitude.toFixed(4);
            navigate(`/${lat},${lon}`);
          },
          () => {
            alert(
              "Location permission denied. Please enable location access to use this feature."
            );
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
  },
  { path: "/favorites", icon: Star, label: "Favorites" },
];

function NavLink({ item, isActive, navigate, mobile = false }) {
  const Icon = item.icon;
  const baseClass =
    "flex items-center gap-2 rounded-lg transition-all text-[var(--color-nav-link)] hover:bg-[var(--color-card-shadow)] hover:text-[var(--color-nav-link-hover)]";
  const activeClass = "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)] hover:text-white";

  const desktopContent = (
    <>
      <Icon className="size-5 shrink-0" />
      <span className="hidden lg:inline">{item.label}</span>
    </>
  );

  const mobileContent = (
    <>
      <Icon className="size-5 shrink-0" />
      <span className="text-xs">{item.label}</span>
    </>
  );

  const content = mobile ? mobileContent : desktopContent;
  const wrapperClass = mobile
    ? "flex flex-col items-center justify-center py-2 px-3 min-w-0"
    : "w-full justify-start px-4 py-3";

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={() => item.onClick(navigate)}
        className={cn(baseClass, wrapperClass, isActive && activeClass)}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={item.path}
      className={cn(baseClass, wrapperClass, isActive && activeClass)}
    >
      {content}
    </Link>
  );
}

function DashboardLayout() {
  const [theme, setTheme] = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[var(--color-dashboard-bg)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 w-60 h-screen flex-col bg-[var(--color-nav-bg)] border-r border-[var(--color-card-shadow)] p-4">
        <nav className="flex flex-col gap-2 flex-1">
          <div className="p-3 mb-2 text-center">
            <Link
              to="/"
              className="flex items-center justify-center text-[var(--color-nav-link)] font-semibold no-underline hover:text-[var(--color-nav-link-hover)] transition-colors"
            >
              <Sun className="size-7" />
              <span className="hidden lg:inline ms-2 text-lg">Weather</span>
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path + item.label}
                item={item}
                isActive={location.pathname === item.path}
                navigate={navigate}
              />
            ))}
          </div>

          <div className="mt-auto p-3 flex justify-center">
            <ThemePicker variant="all" value={theme} onChange={setTheme} />
          </div>
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-nav-bg)] border-t border-[var(--color-card-shadow)] py-2 z-[1000] [--mobile-nav-height:4rem]">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path + item.label}
              item={item}
              isActive={location.pathname === item.path}
              navigate={navigate}
              mobile
            />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 min-h-screen pb-[var(--mobile-nav-height,0)]">
        <div className="py-4 px-3 md:px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
