function FormEntry({ entry, onChange }) {
  return (
    <label>
      {entry.label}
      <input
        type={entry.type}
        name={entry.name}
        value={entry.value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default FormEntry;
