import { Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <StoreProvider>
      <div className="layout">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/suppliers" replace />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
              <Route path="/inventory" element={<Placeholder title="Inventory" />} />
              <Route path="/reports" element={<Placeholder title="Reports" />} />
              <Route path="/manage-store" element={<Placeholder title="Manage Store" />} />
              <Route path="/settings" element={<Placeholder title="Settings" />} />
              <Route path="*" element={<Navigate to="/suppliers" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}