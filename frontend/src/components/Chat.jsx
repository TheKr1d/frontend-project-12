import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addChannel,
  getChannels,
  selectActiveChannelId,
  selectAllChannels,
} from '../slices/channels';
import {
  addMessage,
  fetchAddMessage,
  getMessages,
  selectAllMessages,
} from '../slices/messages';
import { selectIsConnected } from '../slices/socket';
import { useSocket } from '../utils/useSocket';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthorized } = useSelector((state) => state.auth);
  const channels = useSelector(selectAllChannels);
  const activeChannelId = useSelector(selectActiveChannelId);
  const messages = useSelector(selectAllMessages);
  const _isConnected = useSelector(selectIsConnected);
  const { socket, on, off } = useSocket(user, token);

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getChannels(token));
      dispatch(getMessages(token));
    }
  }, [isAuthorized, dispatch, token]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload));
    };

    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload));
    };

    on('newMessage', handleNewMessage);
    on('newChannel', handleNewChannel);

    return () => {
      off('newMessage', handleNewMessage);
      off('newChannel', handleNewChannel);
    };
  }, [socket, on, off, dispatch]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }, { resetForm }) => {
      const newMessage = {
        body: message,
        channelId: activeChannelId,
        username: user,
      };
      dispatch(fetchAddMessage({ token, newMessage }));
      resetForm();
    },
  });

  const messagesChannel = messages.filter(
    (m) => m.channelId === activeChannelId,
  );

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <aside className="col-12 col-md-4 col-lg-3 border-end bg-light p-0">
          <Channels channels={channels} activeChannelId={activeChannelId} />
        </aside>

        <main className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0">
          <header className="border-bottom p-3">
            <h1 className="h5 mb-0">{'Выбирите канал'}</h1>
          </header>

          <Messages messages={messagesChannel} />

          <form
            className="border-top bg-white p-3"
            onSubmit={formik.handleSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                name="message"
                className="form-control"
                placeholder="Введите сообщение..."
                value={formik.values.message}
                onChange={formik.handleChange}
                //disabled={!selectedChannelId}
              />

              <button
                type="submit"
                className="btn btn-primary"
                //disabled={!selectedChannelId}
              >
                Отправить
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Chat;
