import { useState } from "react";
import Modal from "./Modal";
import Field from "./Field";

const CATEGORIES = ["Beverages", "Snacks", "Dairy", "Fruits", "Vegetables", "Household"];

export default function OrderModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    productName: "", productId: "", category: "", orderValue: "",
    quantity: "", unit: "", buyingPrice: "", deliveryDate: "", notify: false,
  });
  const [errors, setErrors] = useState({});

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.productName.trim()) err.productName = "Majburiy";
    if (!form.productId.trim()) err.productId = "Majburiy";
    if (!(Number(form.orderValue) > 0)) err.orderValue = "0 dan katta son kiriting";
    if (!(Number(form.quantity) > 0)) err.quantity = "0 dan katta son kiriting";
    if (!form.unit.trim()) err.unit = "Majburiy";
    if (!form.deliveryDate) err.deliveryDate = "Sanani tanlang";
    setErrors(err);
    if (Object.keys(err).length) return;

    const [y, m, d] = form.deliveryDate.split("-");
    onSave({
      product: form.productName.trim(),
      orderValue: Number(form.orderValue),
      quantity: `${form.quantity} ${form.unit.trim()}`,
      orderId: form.productId.trim(),
      expected: `${d}/${m}/${y.slice(2)}`,
      status: "Confirmed",
      notify: form.notify,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3>New Order</h3>

        <Field label="Product Name" error={errors.productName}>
          <input type="text" placeholder="Enter product name" value={form.productName}
            onChange={(e) => setField("productName", e.target.value)} />
        </Field>

        <Field label="Product ID" error={errors.productId}>
          <input type="text" placeholder="Enter product ID" value={form.productId}
            onChange={(e) => setField("productId", e.target.value)} />
        </Field>

        <Field label="Category">
          <select value={form.category} onChange={(e) => setField("category", e.target.value)}>
            <option value="">Select product category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Order value" error={errors.orderValue}>
          <input type="number" min="0" placeholder="Enter order value" value={form.orderValue}
            onChange={(e) => setField("orderValue", e.target.value)} />
        </Field>

        <Field label="Quantity" error={errors.quantity}>
          <input type="number" min="0" placeholder="Enter product quantity" value={form.quantity}
            onChange={(e) => setField("quantity", e.target.value)} />
        </Field>

        <Field label="Unit" error={errors.unit}>
          <input type="text" placeholder="Enter product unit (Packets)" value={form.unit}
            onChange={(e) => setField("unit", e.target.value)} />
        </Field>

        <Field label="Buying price">
          <input type="number" min="0" placeholder="Enter buying price" value={form.buyingPrice}
            onChange={(e) => setField("buyingPrice", e.target.value)} />
        </Field>

        <Field label="Date of delivery" error={errors.deliveryDate}>
          <input type="date" value={form.deliveryDate}
            onChange={(e) => setField("deliveryDate", e.target.value)} />
        </Field>

        <label className="check-row">
          <input type="checkbox" checked={form.notify}
            onChange={(e) => setField("notify", e.target.checked)} />
          Notify on the date of delivery
        </label>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>Discard</button>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </Modal>
  );
}