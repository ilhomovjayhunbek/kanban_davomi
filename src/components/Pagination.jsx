export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button className="btn btn-outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>
        Page <b>{page}</b> of {totalPages}
      </span>
      <button className="btn btn-outline" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}