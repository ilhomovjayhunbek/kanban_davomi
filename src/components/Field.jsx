export default function Field({ label, error, children }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <div className="form-control">
        {children}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}