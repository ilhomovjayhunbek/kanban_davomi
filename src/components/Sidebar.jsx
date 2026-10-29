import { NavLink } from "react-router-dom";
import {
  Home, Package, BarChart3, UserCircle, ShoppingBag,
  ClipboardList, Settings, LogOut,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/suppliers", label: "Suppliers", icon: UserCircle },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
  { to: "/manage-store", label: "Manage Store", icon: ClipboardList },
];

const cls = ({ isActive }) => "nav-item" + (isActive ? " active" : "");

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-mark">K</div>
        KANBAN
      </div>

      <nav className="nav">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <NavLink key={l.to} to={l.to} className={cls}>
              <Icon size={18} /> {l.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className={cls}>
          <Settings size={18} /> Settings
        </NavLink>
        <button className="nav-item" onClick={() => alert("Log out bosildi")}>
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
}