import { Formik, useFormik } from "formik";
import Channel from "./renderChanel.jsx";
import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import { getChannelsAsync } from "../redux/asyncThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addMessage } from "../redux/messages.js";
import { addChanel } from "../redux/channels.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Root({ value }) {
  const [activeChannel, setActiveChanel] = useState("general");
  const { socket } = value;

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleOpen = () => setModalShow(true);
  const fModal = useFormik({
    initialValues: {
      value: "",
    },
    onSubmit: ({value}) => {
      socket.emit("newChannel", { name: value});
      handleClose();
      fModal.values.value = '';
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { entities } = useSelector((state) => state.channels);

  const messages = useSelector((state) => state.messages);
  const messagesList = Object.values(messages.entities).filter(
    (i) => i.entities.chatName === activeChannel
  );
  const channels = Object.values(entities);

  useEffect(() => {
    dispatch(getChannelsAsync());
    socket.onAny((eventName, arg) => {
      if (eventName === 'newMessage') {
        dispatch(addMessage(arg));
      } if (eventName === 'newChannel') {
        dispatch(addChanel(arg));
      }
    });
  }, [dispatch, socket]);

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    onSubmit: ({ value }) => {
      const { username } = JSON.parse(window.localStorage.getItem("userId"));
      socket.emit("newMessage", {
        entities: { message: value, chatName: activeChannel, author: username },
      });
      formik.values.value = "";
    },
  });

  const logOut = () => {
    const local = window.localStorage;
    local.clear();
  };
  return (
    <div className="h-100 w-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  No Chat
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                >
                  Выйти
                </button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>Каналы</span>
                    <button
                      type="button"
                      className="p-0 text-primary btn btn-group-vertical"
                      onClick={handleOpen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                      </svg>
                      <span className="visually-hidden">+</span>
                    </button>
                  </div>
                  <ul className="nav flex-column nav-pills nav-fill px-2">
                    {channels.map((channel, id) => {
                      return (
                        <Channel
                          value={{ channel, activeChannel, setActiveChanel }}
                          key={id}
                        />
                      );
                    })}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b># {activeChannel}</b>
                      </p>
                      <span className="text-muted">
                        {messagesList.length} сообщений
                      </span>
                    </div>
                    <div
                      id="messages-box"
                      className="chat-messages overflow-auto px-5"
                    >
                      {messagesList.map(({ entities }, id) => {
                        const { author, message } = entities;
                        return (
                          <div key={id}>
                            <b>{author}</b>: {message}
                          </div>
                        );
                      })}
                    </div>
                    <Formik>
                      <div className="mt-auto px-5 py-3">
                        <Form
                          onSubmit={formik.handleSubmit}
                          className="py-1 border rounded-2"
                        >
                          <div className="input-group has-validation">
                            <input
                              name="value"
                              aria-label="Новое сообщение"
                              placeholder="Введите сообщение..."
                              className="border-0 p-0 ps-2 form-control"
                              value={formik.values.value}
                              onChange={formik.handleChange}
                            />
                            <Button
                              type="submit"
                              className="btn btn-group-vertical"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="20"
                                height="20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                                ></path>
                              </svg>
                              <span className="visually-hidden">Отправить</span>
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Toastify"></div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik>
            <Form>
              <input
                name="value"
                className="mb-2 form-control"
                value={fModal.values.value}
                onChange={fModal.handleChange}
                autoFocus
              />
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >Отменить</Button>
          <Button variant="primary" onClick={fModal.handleSubmit}>Отправить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
