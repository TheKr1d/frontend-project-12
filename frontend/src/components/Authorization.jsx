import { useFormik } from 'formik';

const Authorization = () => {
    const formik = useFormik({
            initialValues: {
                email: "",
                password: ""
            },
            onSubmit: (values) => {
                console.log(JSON.stringify(values, null, 2));
            },
        });
        return (
            <main className="container min-vh-100 d-flex align-items-center justify-content-center">
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '420px' }}>
                    <div className="card-body p-4">
                        <h1 className="h3 text-center mb-4">Авторизация</h1>
    
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
    
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={formik.email}
                                    onChange={formik.handleChange}
                                    placeholder="Введите email"
                                    required
                                />
                            </div>
    
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Пароль
                                </label>
    
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    value={formik.password}
                                    onChange={formik.handleChange}
                                    placeholder="Введите пароль"
                                    required
                                />
                            </div>
    
                            <button type="submit" className="btn btn-primary w-100">
                                Войти
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
};

export default Authorization;