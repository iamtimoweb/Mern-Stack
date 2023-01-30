import { useState } from "react";
import useRegister from "../../hooks/useRegister";

export const Register = () => {
    const [registerFormData, setRegisterFormData] = useState({ email: "", password: "" });

    // custom register hook for registering users
    const { register, registerAlerts } = useRegister();

    const { error, isloading } = registerAlerts;


    const handleRegistration = async (e) => {
        e.preventDefault();
        // register user
        await register(registerFormData.email, registerFormData.password);
    };
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-6">
                    <div className="card border-0 my-5">
                        <div className="card-body">
                            <form onSubmit={handleRegistration}>
                                <h4>Register</h4>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" value={registerFormData.email} onChange={(e) => setRegisterFormData({ ...registerFormData, email: e.target.value })} className="form-control" placeholder="your email..." />
                                    </div>
                                    <div className="col-12">
                                        <label id="password" htmlFor="password">
                                            Password
                                        </label>
                                        <input type="password" value={registerFormData.password} onChange={(e) => setRegisterFormData({ ...registerFormData, password: e.target.value })} className="form-control" placeholder="your password..." />
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
