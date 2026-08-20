import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearError, createNewUser } from '../slices/auth';

const Authorization = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthorized } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, t('validation.min', { count: 4 }))
        .required(t('validation.required')),
      password: Yup.string()
        .min(6, t('validation.min', { count: 6 }))
        .required(t('validation.required')),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), null], t('validation.passwordsMatch'))
        .required(t('validation.required')),
    }),
    onSubmit: (values) => {
      dispatch(createNewUser(values));
    },
  });

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title as="h1" className="text-center mb-4">
                {t('common.titles.signup')}
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

                <Form.Group className="mb-3" controlId="passwordRepeat">
                  <Form.Label>{t('common.labels.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('common.placeholders.passwordRepeat')}
                    value={formik.values.passwordRepeat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.passwordRepeat &&
                      !!formik.errors.passwordRepeat
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordRepeat}
                  </Form.Control.Feedback>
                </Form.Group>

                {error && (
                  <div className="alert alert-danger" role="alert">
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
                      {t('common.titles.loading')}
                    </>
                  ) : (
                    t('common.titles.logined')
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

export default Authorization;
