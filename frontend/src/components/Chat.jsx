import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getChannels, selectAllChannels } from '../slices/channels';
import { getMessages, selectAllMessages } from '../slices/messages';
import Channels from './Channels';
import Messages from './Messages';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const channels = useSelector(selectAllChannels);
  const messages = useSelector(selectAllMessages);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getChannels(token));
    dispatch(getMessages(token));
  }, [token, dispatch]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      сonsole.log(values);
    },
  });

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <aside className="col-12 col-md-4 col-lg-3 border-end bg-light p-0">
          <Channels channels={channels} />
        </aside>

        <main className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0">
          <header className="border-bottom p-3">
            <h1 className="h5 mb-0">{'Выбирите канал'}</h1>
          </header>

          <Messages messages={messages} />

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
