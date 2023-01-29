import cn from 'classnames';

const RemovableRender = ({className, setActiveChanel, name}) => {
  return (
    <button type="button" className={className} onClick={() => setActiveChanel(name)}>
        <span className="me-1">#</span>
        {name}
    </button>
  )
}

const NoRemovableRender = ({className, setActiveChanel, name}) => {
  return (
    <button type="button" className={className} onClick={() => setActiveChanel(name)}>
        <span className="me-1">#</span>
        {name}
    </button>
  )
}


export default function Channel({ value }) {
  const { channel, activeChannel, setActiveChanel } = value;
  const {name, id, removable } = channel;
  const className = cn('w-100 rounded-0 text-start btn', activeChannel === name ? 'btn-secondary' : '');
  return (
    <li className="nav-item w-100" id={id} key={id} >
      {removable ? <RemovableRender className={className} setActiveChanel={setActiveChanel} name={name} /> : <NoRemovableRender className={className} setActiveChanel={setActiveChanel} name={name}/>}
    </li>
  );
}
