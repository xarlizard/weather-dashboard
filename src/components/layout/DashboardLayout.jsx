import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ThemePicker from "@/components/ui/ThemePicker";
import { useTheme } from "@/hooks/useTheme";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiMap } from "react-icons/bi";
import { MdMyLocation } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";
import styles from "./DashboardLayout.module.css";

const navItems = [
  { path: "/", icon: <AiOutlineHome size={20} />, label: "Home" },
  { path: "/search", icon: <BiSearch size={20} />, label: "Search" },
  { path: "/map", icon: <BiMap size={20} />, label: "Map Selector" },
  {
    path: "#",
    icon: <MdMyLocation size={20} />,
    label: "Current Location",
    onClick: (navigate) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lon = position.coords.longitude.toFixed(4);
            navigate(`/${lat},${lon}`);
          },
          (_error) => {
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
  { path: "/favorites", icon: <BsStar size={20} />, label: "Favorites" },
];

function DashboardLayout() {
  const [theme, setTheme] = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardRoot}>
      {/* Desktop Sidebar */}
      <Navbar className={styles.sidebar}>
        <Nav className="flex-column gap-2 w-100">
          <div className="p-3 mb-2 text-center">
            <Link to="/" className={styles.logo}>
              <span className="fs-3">
                <WiDaySunny size={28} />
              </span>
              <span className="d-none d-lg-inline ms-2 fs-5">Weather</span>
            </Link>
          </div>

          <div className="nav-items px-3">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={item.onClick ? "button" : Link}
                to={!item.onClick ? item.path : undefined}
                onClick={
                  item.onClick ? () => item.onClick(navigate) : undefined
                }
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label d-none d-lg-inline ms-3">
                  {item.label}
                </span>
              </Nav.Link>
            ))}
          </div>

          <div className="mt-auto p-3 d-flex justify-content-center">
            <ThemePicker variant="all" value={theme} onChange={setTheme} />
          </div>
        </Nav>
      </Navbar>

      {/* Mobile Bottom Nav */}
      <Navbar fixed="bottom" className={`d-md-none ${styles.mobileNav}`}>
        <Container fluid className="px-2">
          <Nav className="w-100 justify-content-around">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={item.onClick ? "button" : Link}
                to={!item.onClick ? item.path : undefined}
                onClick={
                  item.onClick ? () => item.onClick(navigate) : undefined
                }
                className={`${styles.mobileNavItem} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <div className="d-flex flex-column align-items-center">
                  <span className="nav-icon mb-1">{item.icon}</span>
                  <span className="nav-label small">{item.label}</span>
                </div>
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className={styles.main}>
        <Container fluid className="py-4 px-3 px-md-4">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default DashboardLayout;
