import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/auth';

const NavScrollExample = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.auth);

  const hangleLogin = () => {
    dispatch(logout());
    navigate(`/login`);
  };

  const hangleSignup = () => {
    dispatch(logout());
    navigate(`/signup`);
  };

  const hangleLogout = () => {
    navigate(`/login`);
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold">
            Hexlet Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm" onClick={hangleLogin}>
                {t('common.buttons.login')}
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={hangleSignup}
              >
                {t('common.buttons.signup')}
              </Button>
              {isAuthorized && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={hangleLogout}
                >
                  {t('common.buttons.logout')}
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

export default NavScrollExample;
