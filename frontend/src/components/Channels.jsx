const Channels = ({ channels, activeChannelId }) => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom p-3">
        <h2 className="h5 mb-0">Каналы</h2>
      </div>

      <div className="list-group list-group-flush">
        {channels.map((channel) => (
          <button
            type="button"
            key={channel.id}
            className={`list-group-item list-group-item-action ${
              channel.id === activeChannelId ? 'active' : ''
            }`}
            onClick={() => console.log(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Channels;
