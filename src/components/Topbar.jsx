import { Search, Bell } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Topbar() {
  const { search, setSearch } = useStore();

  return (
    <header className="topbar">
      <div className="search">
        <Search size={16} />
        <input
          placeholder="Search product, supplier, order"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <Bell size={18} />
        <div className="avatar">A</div>
      </div>
    </header>
  );
}