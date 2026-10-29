export default function Placeholder({ title }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <p style={{ color: "#858d9d" }}>Bu sahifa hali tayyor emas.</p>
    </div>
  );
}