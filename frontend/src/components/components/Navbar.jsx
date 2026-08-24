import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/auth';
import { notificationService } from '../../utils/notificationService';

const NavScrollExample = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.auth);

  const handleRedirectChat = (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      notificationService.info('notifications.dontAutorised');
    }
    navigate('/');
  };

  const handleLogin = () => {
    if (isAuthorized) {
      dispatch(logout());
      notificationService.info('notifications.infoLogout');
    }
    navigate('/login', { replace: true });
  };

  const handleSignup = () => {
    if (isAuthorized) {
      dispatch(logout());
      notificationService.info('notifications.infoLogout');
    }
    navigate('/signup', { replace: true });
  };

  const handleLogout = () => {
    if (isAuthorized) {
      dispatch(logout());
      notificationService.info('notifications.infoLogout');
    }
    navigate(`/login`);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand
            onClick={handleRedirectChat}
            href="/"
            className="fw-bold"
          >
            Hexlet Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <div className="d-flex gap-2">
              {!isAuthorized && (
                <>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleLogin}
                  >
                    {t('common.buttons.login')}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleSignup}
                  >
                    {t('common.buttons.signup')}
                  </Button>
                </>
              )}
              {isAuthorized && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
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
