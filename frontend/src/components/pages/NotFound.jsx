import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1 className="display-1 text-muted text-center">404</h1>
          <p className="text-center text-secondary">
            {t('fieldErrors.notFound')}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
