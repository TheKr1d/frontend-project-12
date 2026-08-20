// hooks/useSocket.js
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketConnected, socketDisconnected } from '../slices/socket';

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

    const socket = io('/', {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected');
      setIsReady(true);
      dispatch(socketConnected());
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setIsReady(false);
      dispatch(socketDisconnected());
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket error:', error);
      setIsReady(false);
      dispatch(socketDisconnected());
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
