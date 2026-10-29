import { createContext, useContext, useEffect, useState } from "react";
import { initialSuppliers, initialOrders } from "../data/initialData";

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* joy yetmasa e'tibor bermaymiz */
  }
}

export function StoreProvider({ children }) {
  const [suppliers, setSuppliers] = useState(() => load("kanban_suppliers", initialSuppliers));
  const [orders, setOrders] = useState(() => load("kanban_orders", initialOrders));
  const [search, setSearch] = useState("");

  useEffect(() => save("kanban_suppliers", suppliers), [suppliers]);
  useEffect(() => save("kanban_orders", orders), [orders]);

  const addSupplier = (supplier) =>
    setSuppliers((prev) => [{ id: Date.now(), ...supplier }, ...prev]);

  const addOrder = (order) =>
    setOrders((prev) => [{ id: Date.now(), ...order }, ...prev]);

  return (
    <StoreContext.Provider
      value={{ suppliers, orders, search, setSearch, addSupplier, addOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}