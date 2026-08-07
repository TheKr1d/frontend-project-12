const Messages = ({ messages }) => {
  return (
    <section className="flex-grow-1 overflow-auto bg-light p-4">
      {messages.length === 0 ? (
        <div className="text-center text-secondary">
          В этом канале пока нет сообщений
        </div>
      ) : (
        messages.map((message) => (
          <article key={message.id} className="mb-3">
            <div className="d-flex align-items-baseline gap-2">
              <strong>{message.username || 'Пользователь'}</strong>

              {message.createdAt && (
                <small className="text-secondary">
                  {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              )}
            </div>

            <div className="d-inline-block bg-white border rounded px-3 py-2 mt-1">
              {message.body}
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default Messages;
