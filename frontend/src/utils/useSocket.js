// hooks/useSocket.js
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketConnected, socketDisconnected } from '../slices/socket';
import { getSocketConfig } from '../utils/socketConfig';

export const useSocket = (user, token) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsReady(false);
        dispatch(socketDisconnected());
      }
      return;
    }

    // Получаем конфигурацию для сокета
    const { url, options } = getSocketConfig();

    // Создаем сокет с правильным URL
    const socket = io(url, {
      ...options,
      auth: {
        token: token, // Передаем токен для авторизации
      },
      // Дополнительные опции для надежности
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected to:', url);
      setIsReady(true);
      dispatch(socketConnected());
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      setIsReady(false);
      dispatch(socketDisconnected());
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket error:', error);
      setIsReady(false);
      dispatch(socketDisconnected());
    });

    // Обработка ошибок авторизации
    socket.on('unauthorized', (error) => {
      console.error('🔒 Socket unauthorized:', error);
      // Можно обработать перелогин здесь
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsReady(false);
    };
  }, [user, token, dispatch]);

  return {
    socket: socketRef.current,
    isReady,
    emit: (event, data) => {
      if (socketRef.current && isReady) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('⚠️ Socket not ready, cannot emit:', event);
      }
    },
    on: (event, handler) => {
      if (socketRef.current) {
        socketRef.current.on(event, handler);
      }
    },
    off: (event, handler) => {
      if (socketRef.current) {
        socketRef.current.off(event, handler);
      }
    },
  };
};
