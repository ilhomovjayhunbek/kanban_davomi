import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import { downloadCSV } from "../utils/csv";
import Pagination from "../components/Pagination";
import FilterDropdown from "../components/FilterDropdown";
import OrderModal from "../components/OrderModal";

const PAGE_SIZE = 10;
const FILTERS = ["All", "Delayed", "Confirmed", "Returned", "Out for delivery"];
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const statusClass = (s) => "status-" + s.toLowerCase().replace(/\s+/g, "-");

export default function Orders() {
  const { orders, addOrder, search } = useStore();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [history, setHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const stats = useMemo(() => {
    const sum = (list) => list.reduce((s, o) => s + o.orderValue, 0);
    const received = orders.filter((o) => o.status === "Out for delivery");
    const returned = orders.filter((o) => o.status === "Returned");
    const onWay = orders.filter((o) => o.status === "Confirmed" || o.status === "Delayed");
    return {
      total: orders.length,
      received: { count: received.length, value: sum(received) },
      returned: { count: returned.length, value: sum(returned) },
      onWay: { count: onWay.length, value: sum(onWay) },
    };
  }, [orders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const okSearch =
        !q || o.product.toLowerCase().includes(q) || o.orderId.toLowerCase().includes(q);
      const okStatus = filter === "All" || o.status === filter;
      const okHistory =
        !history || o.status === "Returned" || o.status === "Out for delivery";
      return okSearch && okStatus && okHistory;
    });
  }, [orders, search, filter, history]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <div className="card">
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Overall Orders</h2>
        <div className="stats">
          <div className="stat">
            <h4 className="c-blue">Total Orders</h4>
            <div className="stat-val">{stats.total}</div>
            <div className="stat-label">Last 7 days</div>
          </div>

          <div className="stat">
            <h4 className="c-orange">Total Received</h4>
            <div className="stat-row">
              <div>
                <div className="stat-val">{stats.received.count}</div>
                <div className="stat-label">Last 7 days</div>
              </div>
              <div>
                <div className="stat-val">{money(stats.received.value)}</div>
                <div className="stat-label">Revenue</div>
              </div>
            </div>
          </div>

          <div className="stat">
            <h4 className="c-purple">Total Returned</h4>
            <div className="stat-row">
              <div>
                <div className="stat-val">{stats.returned.count}</div>
                <div className="stat-label">Last 7 days</div>
              </div>
              <div>
                <div className="stat-val">{money(stats.returned.value)}</div>
                <div className="stat-label">Cost</div>
              </div>
            </div>
          </div>

          <div className="stat">
            <h4 className="c-red">On the way</h4>
            <div className="stat-row">
              <div>
                <div className="stat-val">{stats.onWay.count}</div>
                <div className="stat-label">Ordered</div>
              </div>
              <div>
                <div className="stat-val">{money(stats.onWay.value)}</div>
                <div className="stat-label">Cost</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Orders</h2>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add Product
            </button>
            <FilterDropdown
              options={FILTERS}
              value={filter}
              onChange={(v) => {
                setFilter(v);
                setPage(1);
              }}
            />
            <button
              className={"btn btn-outline" + (history ? " active" : "")}
              onClick={() => {
                setHistory(!history);
                setPage(1);
              }}
            >
              Order History
            </button>
            <button
              className="btn btn-outline"
              onClick={() =>
                downloadCSV(
                  "orders.csv",
                  filtered.map((o) => ({
                    Product: o.product,
                    "Order Value": o.orderValue,
                    Quantity: o.quantity,
                    "Order ID": o.orderId,
                    "Expected Delivery": o.expected,
                    Status: o.status,
                  }))
                )
              }
            >
              Download all
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Order Value</th>
                <th>Quantity</th>
                <th>Order ID</th>
                <th>Expected Delivery</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty">Hech narsa topilmadi</td>
                </tr>
              ) : (
                rows.map((o) => (
                  <tr key={o.id}>
                    <td>{o.product}</td>
                    <td>{money(o.orderValue)}</td>
                    <td>{o.quantity}</td>
                    <td>{o.orderId}</td>
                    <td>{o.expected}</td>
                    <td className={statusClass(o.status)}>{o.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
      </div>

      {showModal && <OrderModal onClose={() => setShowModal(false)} onSave={addOrder} />}
    </>
  );
}