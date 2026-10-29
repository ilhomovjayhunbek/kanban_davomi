import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import { downloadCSV } from "../utils/csv";
import Pagination from "../components/Pagination";
import FilterDropdown from "../components/FilterDropdown";
import SupplierModal from "../components/SupplierModal";

const PAGE_SIZE = 10;
const FILTERS = ["All", "Taking Return", "Not Taking Return"];

export default function Suppliers() {
  const { suppliers, addSupplier, search } = useStore();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return suppliers.filter((s) => {
      const okSearch =
        !q || [s.name, s.product, s.contact, s.email].some((v) => v.toLowerCase().includes(q));
      const okType = filter === "All" || s.type === filter;
      return okSearch && okType;
    });
  }, [suppliers, search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDownload = () =>
    downloadCSV(
      "suppliers.csv",
      filtered.map((s) => ({
        "Supplier Name": s.name,
        Product: s.product,
        "Contact Number": s.contact,
        Email: s.email,
        Type: s.type,
        "On the way": s.onTheWay,
      }))
    );

  return (
    <div className="card">
      <div className="card-header">
        <h2>Suppliers</h2>
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
          <button className="btn btn-outline" onClick={handleDownload}>
            Download all
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Product</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Type</th>
              <th>On the way</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">Hech narsa topilmadi</td>
              </tr>
            ) : (
              rows.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.product}</td>
                  <td>{s.contact}</td>
                  <td>{s.email}</td>
                  <td className={s.type === "Taking Return" ? "green" : "red"}>{s.type}</td>
                  <td>{s.onTheWay}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      {showModal && (
        <SupplierModal onClose={() => setShowModal(false)} onSave={addSupplier} />
      )}
    </div>
  );
}