export default function FormRow({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
}) {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        required={true}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      ></input>
    </div>
  )
}
