import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearError, loginUser } from '../slices/auth';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthorized } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, t('validation.min', { count: 4 }))
        .required(t('validation.required')),
      password: Yup.string()
        .min(5, t('validation.min', { count: 5 }))
        .required(t('validation.required')),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, [isAuthorized, navigate]);

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title as="h1" className="text-center mb-4">
                {t('common.titles.login')}
              </Card.Title>

              <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('common.labels.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('common.placeholders.username')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.username && !!formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('common.labels.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('common.placeholders.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {error && (
                  <div
                    className="invalid-feedback d-block mb-3"
                    style={{ fontSize: '0.875rem' }}
                  >
                    <i className="bi bi-exclamation-circle me-1"></i>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Загрузка...
                    </>
                  ) : (
                    'Войти'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
