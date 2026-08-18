const Messages = ({ messages }) => {
  return (
    <div
      className="flex-grow-1 overflow-auto p-3"
      style={{ maxHeight: 'calc(100vh - 140px)' }}
    >
      {messages.length === 0 ? (
        <div className="text-center text-secondary mt-5">
          В этом канале пока нет сообщений
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {messages.map((message) => (
            <div key={message.id} className="d-flex flex-column">
              <div className="d-flex align-items-baseline gap-2">
                <strong className="text-primary">
                  {message.username || 'Пользователь'}
                </strong>
                {message.createdAt && (
                  <small className="text-secondary">
                    {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </small>
                )}
              </div>
              <div
                className="bg-white border rounded-3 px-3 py-2 mt-1"
                style={{ maxWidth: '80%' }}
              >
                {message.body}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
