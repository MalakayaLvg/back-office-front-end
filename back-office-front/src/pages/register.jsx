
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [ roleCafe, setRoleCafe] = useState(false)
    const [ roleComedyclub, setRoleComedyclub ] = useState(false)
    const [ role, setRole ] = useState(null | "")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`https://backend-comedyclub.esdlyon.dev/register/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert("Registration failed");
            }

            alert("registration successful")
            navigate("/")
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="d-flex flex-column px-5 align-items-center">
            <h2 className="text-center my-5">Register</h2>

            <div className="py-5">
                <h2 className="py-3 text-center">Vous etes :</h2>


                <div>
                    <button className="btn btn-primary me-2" onClick={()=> setRole("venue")}>
                        Un café
                    </button>

                    <button className="btn btn-secondary me-2" onClick={()=> setRole("comedyClub")}>
                        Un comedy club
                    </button>
                </div>

            </div>



            { role ? (
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
                        <label>Confirm Password</label>
                        <input
                            className="my-4"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <button type="submit">Register</button>
                    </form>
            ) : (
                <div className="py-5"> Choisir un role </div>
            )}

            {error && <div>{error}</div>}
        </div>
    );
};

export default Register;
