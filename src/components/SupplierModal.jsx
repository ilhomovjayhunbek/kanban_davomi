import { useRef, useState } from "react";
import { User } from "lucide-react";
import Modal from "./Modal";
import Field from "./Field";

const CATEGORIES = ["Chocolate", "Beverages", "Snacks", "Dairy", "Fruits", "Vegetables", "Household"];

export default function SupplierModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", product: "", category: "", buyingPrice: "", contact: "", type: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Supplier nomini kiriting";
    if (!form.product.trim()) err.product = "Mahsulot nomini kiriting";
    if (!/^\d{7,15}$/.test(form.contact)) err.contact = "Faqat raqamlar (7-15 ta)";
    if (!form.type) err.type = "Turini tanlang";
    setErrors(err);
    if (Object.keys(err).length) return;

    onSave({
      name: form.name.trim(),
      product: form.product.trim(),
      category: form.category,
      buyingPrice: Number(form.buyingPrice) || 0,
      contact: form.contact,
      email: form.name.toLowerCase().replace(/\s+/g, "") + "@gmail.com",
      type: form.type,
      onTheWay: "-",
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3>New Supplier</h3>

        <div
          className="upload"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="upload-circle">
            {image ? <img src={image} alt="supplier" /> : <User size={36} />}
          </div>
          <div className="upload-hint">Drag image here<br />or</div>
          <button type="button" className="link-btn" onClick={() => fileRef.current.click()}>
            Browse image
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        <Field label="Supplier Name" error={errors.name}>
          <input type="text" placeholder="Enter supplier name" value={form.name}
            onChange={(e) => setField("name", e.target.value)} />
        </Field>

        <Field label="Product" error={errors.product}>
          <input type="text" placeholder="Enter product" value={form.product}
            onChange={(e) => setField("product", e.target.value)} />
        </Field>

        <Field label="Category">
          <select value={form.category} onChange={(e) => setField("category", e.target.value)}>
            <option value="">Select product category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Buying Price">
          <input type="number" min="0" placeholder="Enter buying price" value={form.buyingPrice}
            onChange={(e) => setField("buyingPrice", e.target.value)} />
        </Field>

        <Field label="Contact Number" error={errors.contact}>
          <input type="text" placeholder="Enter supplier contact number" value={form.contact}
            onChange={(e) => setField("contact", e.target.value.replace(/\D/g, ""))} />
        </Field>

        <Field label="Type" error={errors.type}>
          <div className="toggle-group">
            {["Not Taking Return", "Taking Return"].map((t) => (
              <button
                type="button"
                key={t}
                className={"toggle" + (form.type === t ? " on" : "")}
                onClick={() => setField("type", t)}
              >
                {t === "Taking Return" ? "Taking return" : "Not taking return"}
              </button>
            ))}
          </div>
        </Field>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>Discard</button>
          <button type="submit" className="btn btn-primary">Add Supplier</button>
        </div>
      </form>
    </Modal>
  );
}