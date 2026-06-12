import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import "./auth.form.scss"
import API from '../api/auth/components/services/api'
export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password })
            nav('/login')

            alert("Registration sucessfully");
            console.log(name, email, password)
        }
        catch (err) {
            console.log("register failed", err.response?.data || err.message)

        }
    }


    return (
        <main>
            <div className="form-container">
                <h1 style={{ fontSize: "30px" }}> <b>Registration Form</b></h1>
                <form onSubmit={handleRegister} >
                    <div className="input-group">
                        <label htmlFor="name"> Name</label>
                        <input type="text" placeholder="enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email"> Email</label>
                        <input type="text" placeholder="enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"> Password</label>
                        <input type="password" placeholder="enter password " value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="button primary-button " type="submit" >
                        Register
                    </button>
                </form>
                <p> Already have an account ? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    );
}