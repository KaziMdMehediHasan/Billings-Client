import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
            }).then(res => res.json()).then(data => {
                localStorage.setItem("profile", JSON.stringify({ ...data }));
                navigate('/Billing');
            });
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <>

            <div>
                <div className="page-banner-area item-bg3">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="page-banner-content">
                                    <h2>Login</h2>
                                    <ul>
                                        <li>
                                        </li>
                                        <li>Login</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="login-area ptb-100">
                    <div className="container">
                        <div className="login-form">
                            <h2>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        value={email}
                                        name="email"
                                        onChange={onInputChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email or phone"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        value={password}
                                        name="password"
                                        onChange={onInputChange}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>

                                <button type="submit">

                                    Login
                                </button>
                            </form>
                            <div className="important-text">
                                <p>
                                    <Link to="/Registration">Don't have an account? Register now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Login;
