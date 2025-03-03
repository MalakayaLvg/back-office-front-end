
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://backend-comedyclub.esdlyon.dev/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert("Invalid credentials");
            }

            alert("login succesful")
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="d-flex flex-column px-5 align-items-center">
            <h2 className="my-5">Login</h2>
            <form className=" d-flex flex-column form-control w-50 py-5" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    className="my-4"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <label>Password</label>
                <input
                    className="my-4"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Login;
