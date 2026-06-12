// Logout.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import API from "../api/auth/components/services/api";

import {
    FaSignOutAlt,
    FaCheckCircle,
} from "react-icons/fa";

export default function Logout(e) {
    e.preventDefault();
    const nav = useNavigate();

    useEffect(() => {

        const logoutUser = async () => {

            try {

                //  LOGOUT API
                await API.get("/auth/logout");
                alert("logout successfully")


            } catch (err) {

                console.log(err);

            } finally {

                //  CLEAR STORAGE
                localStorage.removeItem("token");

                localStorage.removeItem("userId");

                localStorage.removeItem("username");

                localStorage.removeItem("role");

                localStorage.removeItem("questions");

                localStorage.removeItem("certificateRole");

                localStorage.removeItem("certificateScore");

                //  REDIRECT
                setTimeout(() => {

                    nav("/");

                }, 3000);
            }
        };

        logoutUser();

    }, []);

    return (

        <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-5 relative overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-red-400/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-400/20 blur-[140px]" />

            {/* CARD */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="bg-white rounded-[40px] shadow-2xl p-14 max-w-xl w-full text-center relative overflow-hidden"
            >

                {/* TOP BAR */}
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-orange-400 to-pink-500" />

                {/* ICON */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                    }}
                    className="w-28 h-28 mx-auto rounded-full bg-red-100 flex items-center justify-center shadow-lg"
                >

                    <FaSignOutAlt className="text-red-500 text-5xl" />

                </motion.div>

                {/* TITLE */}
                <h1 className="text-5xl font-black text-gray-800 mt-10">

                    Logging Out

                </h1>

                <p className="text-gray-500 mt-5 text-lg leading-relaxed">

                    Please wait while we securely log you out
                    from AI Mock Interview Platform.

                </p>

                {/* SUCCESS */}
                <div className="mt-10 bg-green-50 rounded-3xl p-5 flex items-center gap-4">

                    <FaCheckCircle className="text-green-500 text-3xl" />

                    <div className="text-left">

                        <h3 className="font-bold text-gray-800 text-lg">
                            Session Ended Successfully
                        </h3>

                        <p className="text-gray-500 mt-1">
                            Redirecting to login page...
                        </p>

                    </div>

                </div>

                {/* LOADER */}
                <div className="mt-10 flex justify-center">

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                        }}
                        className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full"
                    />

                </div>

            </motion.div>

        </div>
    );
}