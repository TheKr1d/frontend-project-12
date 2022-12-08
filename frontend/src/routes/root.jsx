import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from 'lodash';

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    const local = window.localStorage;
    _.has(local, 'userId') ? navigate('/'): navigate('/login');
  }, [navigate])
  return (
    <>
      <h1>Главная</h1>
    </>
  );
}