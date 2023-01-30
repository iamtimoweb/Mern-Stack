import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });

    // custom register hook to login users
    const { login, loginAlerts } = useLogin();

    const { error, isloading } = loginAlerts;

    const handleLogin = async (event) => {
        event.preventDefault();

        // login user
        await login(loginFormData.email, loginFormData.password);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-content-center">
                <div className="col-6">
                    <div className="card border-0 my-5">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <h4>Login</h4>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" className="form-control" value={loginFormData.email} onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })} placeholder="your email..." />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" className="form-control" value={loginFormData.password} onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })} placeholder="your password..." />
                                    </div>
                                    <div className="col-12">
                                        {isloading && (
                                            <button className="btn btn-primary" disabled={isloading}>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="visually-hidden text-sm">Please wait...</span>
                                            </button>
                                        )}
                                        <button className="btn btn-primary">Submit</button>
                                    </div>

                                    {error && (
                                        <div className="col-12">
                                            <div className="alert alert-danger">{error}</div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
