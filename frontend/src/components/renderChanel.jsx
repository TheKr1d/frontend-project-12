import cn from 'classnames';

export default function Group({ value }) {

  const { channel, activeChannel, setActiveChanel } = value;
  const {name, id } = channel;
  const className = cn('w-100 rounded-0 text-start btn', activeChannel === name ? 'btn-secondary' : '');
  return (
    <li className="nav-item w-100" id={id} key={id} >
      <button type="button" className={className} onClick={() => setActiveChanel(name)}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}
