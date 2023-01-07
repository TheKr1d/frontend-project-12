import cn from 'classnames';

export default function Group({ value }) {
  const { channel, activeId } = value;
  const {name, id } = channel;
  const className = cn('w-100 rounded-0 text-start btn', activeId === id ? 'btn-secondary' : '');
  return (
    <li className="nav-item w-100" id={id}>
      <button type="button" className={className}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}
