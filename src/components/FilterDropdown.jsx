import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function FilterDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const active = value !== options[0];

  return (
    <div className="dropdown">
      <button className={"btn btn-outline" + (active ? " active" : "")} onClick={() => setOpen(!open)}>
        <SlidersHorizontal size={14} /> Filters{active ? `: ${value}` : ""}
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map((o) => (
            <button
              key={o}
              className={"dropdown-item" + (o === value ? " selected" : "")}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}