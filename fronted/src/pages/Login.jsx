import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import './auth.form.scss';
import API from '../api/auth/components/services/api';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        // EMAIL VALIDATION
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return setError("❌ Please enter a valid email address");
        }

        // PASSWORD VALIDATION
        if (password.length < 6) {
            return setError("❌ Password must be at least 6 characters");
        }

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "userId",
                response.data.user._id);
            localStorage.setItem(
                "username",
                response.data.user.name
            );


            nav("/home");

        } catch (err) {

            console.log(err);

            // BACKEND ERROR
            if (err.response?.status === 401) {
                setError("❌ Invalid Email or Password");
            }
            else {
                setError("❌ Something went wrong");
            }
        }
    };

    return (

        <main>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="form-container"
            >

                <h1 style={{ fontSize: "30px" }}>
                    <b>Login Form</b>
                </h1>

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}
                    <div className="input-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="text"
                            placeholder="enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="input-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* ERROR MESSAGE */}
                    {error && (

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                color: "#ff4d4f",
                                marginBottom: "15px",
                                fontSize: "14px",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* BUTTON */}
                    <button className="button primary-button">
                        Login
                    </button>

                </form>

                <p>
                    Dont have an account ?
                    {" "}
                    <Link to={"/"}>
                        Register
                    </Link>
                </p>

            </motion.div>

        </main>
    );
}