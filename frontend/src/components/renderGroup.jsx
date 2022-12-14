export default function Group({value}) {
    const { id, name } = value;
  return (
    <li className="nav-item w-100" id={id}>
      <button
        type="button"
        className="w-100 rounded-0 text-start btn"
      >
        <span className="me-1">#</span>{name}
      </button>
    </li>
  );
}
