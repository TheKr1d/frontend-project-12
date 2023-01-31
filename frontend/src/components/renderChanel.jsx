import cn from "classnames";
import { useState } from "react";

const RemovableRender = ({ setActiveChanel, name, activeChannel }) => {
  const [showEdit, setShowEdit] = useState(false);

  const classNameChannel = cn(
    "w-100 rounded-0 text-start text-truncate btn",
    activeChannel === name ? "btn-secondary" : ""
  );
  const classRemove = cn(
    "flex-grow-0 dropdown-toggle dropdown-toggle-split btn",
    activeChannel === name ? "btn-secondary" : "",

  );
  return (
    <div className="d-flex dropdown btn-group" role="group">
      <button
        className={classNameChannel}
        type="button"
        onClick={() => setActiveChanel(name)}
      >
        <span className="me-1">#</span>
        {name}
      </button>
      <button
        className={classRemove}
        type="button"
        aria-expanded={showEdit}
        id="react-aria3081811745-1"
        onClick={() => setShowEdit(!showEdit)}
      >
        <span className="visually-hidden">Управление каналом</span>
      </button>
      <div
        className={cn("dropdown-menu", showEdit ? "show" : "")}
        x-placement="bottom-start"
        aria-labelledby="react-aria3081811745-1"
        data-popper-escaped="false"
        data-popper-placement="bottom-start"
        style={{
          position: "absolutes",
          inset: "0px auto auto 0px",
          transform: "translate(115px, 40px)",
        }}
      >
        <a className="dropdown-item" data-rr-ui-dropdown-item="" role="button" tabIndex="0" href="/#">Удалить</a>
        <a className="dropdown-item" data-rr-ui-dropdown-item="" role="button" tabIndex="0" href="/#">Переименовать</a>
      </div>
    </div>
  );
};

const NoRemovableRender = ({ className, setActiveChanel, name }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => setActiveChanel(name)}
    >
      <span className="me-1">#</span>
      {name}
    </button>
  );
};

export default function Channel({ value }) {
  const { channel, activeChannel, setActiveChanel } = value;
  const { name, id, removable } = channel;
  const className = cn(
    "w-100 rounded-0 text-start btn",
    activeChannel === name ? "btn-secondary" : ""
  );
  return (
    <li className="nav-item w-100" id={id} key={id}>
      {removable ? (
        <RemovableRender
          setActiveChanel={setActiveChanel}
          name={name}
          activeChannel={activeChannel}
        />
      ) : (
        <NoRemovableRender
          className={className}
          setActiveChanel={setActiveChanel}
          name={name}
        />
      )}
    </li>
  );
}
