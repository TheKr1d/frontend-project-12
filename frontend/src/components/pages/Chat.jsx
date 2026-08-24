import { useFormik } from 'formik';
import leoP from 'leo-profanity';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addChannel,
  edditChannel,
  fetchAddChannel,
  fetchEditChannel,
  fetchRemoveChannel,
  getChannels,
  removeChannel,
  selectAllChannels,
  setActiveChannel,
} from '../../slices/channels';
import {
  addMessage,
  fetchAddMessage,
  getMessages,
  selectAllMessages,
} from '../../slices/messages';
import { close } from '../../slices/modal';
import { selectIsConnected } from '../../slices/socket';
import { useSocket } from '../../utils/useSocket';
import {
  channelSchema,
  renameChannelSchema,
} from '../../utils/validationSchemas';
import Channels from '../components/Channels';
import Messages from '../components/Messages';

const Chat = () => {
  const [isAddingChannel, setIsAddingChannel] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const _navigate = useNavigate();

  const channels = useSelector(selectAllChannels);
  const { activeChannel, defaultChannel } = useSelector(
    (state) => state.channels,
  );
  const activeChannelId = activeChannel?.id;
  const messages = useSelector(selectAllMessages);
  const _isConnected = useSelector(selectIsConnected);
  const { user, token, isAuthorized } = useSelector((state) => state.auth);
  const { type: typeModal, channelId: thisChannelId } = useSelector(
    (state) => state.modal,
  );

  const { socket, on, off } = useSocket(user, token);

  useEffect(() => {
    if (isAuthorized && token) {
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
      dispatch(setActiveChannel(payload));
    };

    const handleRenameChannel = (payload) => {
      dispatch(edditChannel(payload));
    };

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload));
      dispatch(setActiveChannel(defaultChannel));
    };

    on('newMessage', handleNewMessage);
    on('newChannel', handleNewChannel);
    on('renameChannel', handleRenameChannel);
    on('removeChannel', handleRemoveChannel);

    return () => {
      off('newMessage', handleNewMessage);
      off('newChannel', handleNewChannel);
      off('renameChannel', handleRenameChannel);
    };
  }, [socket, on, off, dispatch, defaultChannel]);

  const messageFormik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }, { resetForm }) => {
      const newMessage = {
        body: leoP.clean(message),
        channelId: activeChannelId,
        username: user,
      };
      dispatch(fetchAddMessage({ token, newMessage }));
      resetForm();
    },
  });

  const channelFormik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema({ t, channels }),
    onSubmit: ({ channelName }, { resetForm, setSubmitting }) => {
      const newChannel = { name: leoP.clean(channelName) };
      dispatch(fetchAddChannel({ token, newChannel }));
      setIsAddingChannel(false);
      resetForm();
      setSubmitting(false);
    },
  });

  const renameFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newChannelName: activeChannel?.name || '',
    },
    validationSchema: renameChannelSchema({ t, channels }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        fetchEditChannel({
          token,
          id: thisChannelId,
          name: leoP.clean(values.newChannelName),
        }),
      );
      resetForm();
      dispatch(close());
    },
  });

  const submitRemoveChannel = () => {
    dispatch(fetchRemoveChannel({ token, id: activeChannelId }));
    dispatch(close());
  };

  const messagesChannel = messages.filter(
    (m) => m.channelId === activeChannelId,
  );

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <aside className="col-12 col-md-4 col-lg-3 border-end bg-light p-0">
          <div className="d-flex flex-column h-100">
            <div className="border-bottom p-3 d-flex justify-content-between align-items-center">
              <h2 className="h5 mb-0">{t('common.titles.channels')}</h2>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                style={{ width: '30px' }}
                onClick={() => {
                  setIsAddingChannel(!isAddingChannel);
                  if (isAddingChannel) {
                    channelFormik.resetForm();
                  }
                }}
                aria-label="Добавить канал"
              >
                <span className="fs-5">{isAddingChannel ? 'x' : '+'}</span>
              </button>
            </div>

            <div
              className={`px-3 pb-3 ${isAddingChannel ? 'd-block' : 'd-none'}`}
            >
              <form onSubmit={channelFormik.handleSubmit}>
                <div className="input-group input-group-sm">
                  <input
                    id="channelName"
                    name="channelName"
                    type="text"
                    className={`form-control form-control-sm ${
                      channelFormik.touched.channelName &&
                      channelFormik.errors.channelName
                        ? 'is-invalid'
                        : ''
                    }`}
                    placeholder={t('common.placeholders.channelName')}
                    value={channelFormik.values.channelName}
                    onChange={channelFormik.handleChange}
                    onBlur={channelFormik.handleBlur}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={
                      !channelFormik.isValid ||
                      !channelFormik.dirty ||
                      channelFormik.isSubmitting
                    }
                  >
                    {t('common.buttons.add')}
                  </button>
                </div>
                {channelFormik.touched.channelName &&
                  channelFormik.errors.channelName && (
                    <div className="invalid-feedback d-block mt-1 small">
                      {channelFormik.errors.channelName}
                    </div>
                  )}
              </form>
            </div>

            <Channels channels={channels} activeChannelId={activeChannelId} />
          </div>
        </aside>

        <main className="col-12 col-md-8 col-lg-9 d-flex flex-column p-0">
          <header className="border-bottom p-3">
            <h1 className="h5 mb-0">
              {activeChannel?.name ?? t('forms.channel.select')}
            </h1>
          </header>
          <div
            className="flex-grow-1 overflow-auto"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            <Messages messages={messagesChannel} />
          </div>

          <form
            className="border-top bg-white p-3"
            onSubmit={messageFormik.handleSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                name="message"
                className="form-control"
                placeholder={t('common.placeholders.message')}
                value={messageFormik.values.message}
                onChange={messageFormik.handleChange}
                disabled={!activeChannelId}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!activeChannelId}
              >
                {t('common.buttons.send')}
              </button>
            </div>
          </form>
        </main>

        <Modal show={typeModal === 'rename'} onHide={() => dispatch(close())}>
          <Modal.Header closeButton>
            <Modal.Title>{`Переименовать канал: "${activeChannel?.name}"`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={renameFormik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="newChannelName"
                  placeholder="Новое название канала"
                  value={renameFormik.values.newChannelName}
                  onChange={renameFormik.handleChange}
                  isInvalid={
                    renameFormik.touched && !!renameFormik.errors.newChannelName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {renameFormik.errors.newChannelName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(close())}>
              Отменить
            </Button>
            <Button
              variant="primary"
              onClick={renameFormik.handleSubmit}
              disabled={
                !renameFormik.isValid ||
                !renameFormik.dirty ||
                renameFormik.isSubmitting
              }
            >
              Изменить
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={typeModal === 'delete'} onHide={() => dispatch(close())}>
          <Modal.Header closeButton>
            <Modal.Title>{activeChannel?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {t('forms.channel.delete.confirm')}
              <br />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(close())}>
              Отменить
            </Button>
            <Button variant="danger" onClick={submitRemoveChannel}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Chat;
