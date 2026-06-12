import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Loader from "../api/auth/components/Loader";

import {
    FaChartPie,
    FaFileAlt,
    FaRobot,
    FaSignOutAlt,
    FaMicrophone,
} from "react-icons/fa";

export default function Home({ step = 1, total = 5 }) {

    const nav = useNavigate();

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartPie />,
            color: "from-blue-500 to-cyan-400",
        },
        {
            name: "Interview",
            path: "/interview",
            icon: <FaMicrophone />,
            color: "from-red-500 to-orange-400",
        },
        {
            name: "Analytics",
            path: "/analytics",
            icon: <FaRobot />,
            color: "from-green-500 to-emerald-400",
        },
        // {
        //     name: "Resume",
        //     path: "/resume",
        //     icon: <FaFileAlt />,
        //     color: "from-yellow-400 to-amber-500",
        // },
        {
            name: "Chatbot",
            path: "/chatbot"
        }
    ];

    return (

        <div className="min-h-screen bg-[#f5f7fb] overflow-hidden relative">

            {/* GOOGLE STYLE BACKGROUND */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-400/20 blur-[140px]" />

            <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-yellow-300/20 blur-[120px]" />

            {/* FLOATING NAVBAR */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{
                    y: [0, -5, 0],
                    opacity: 1,
                }}
                transition={{
                    y: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                    },
                    opacity: {
                        duration: 0.8,
                    },
                }}
                className="sticky top-0 z-50 px-5 pt-5"
            >

                {/* NAV CONTAINER */}
                <div className="max-w-7xl mx-auto">

                    <div className="bg-white/80 backdrop-blur-2xl rounded-[28px] shadow-[0_10px_50px_rgba(0,0,0,0.08)] overflow-hidden">

                        {/* TOP SHINE */}
                        <motion.div
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 7,
                                ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />

                        <div className="relative z-10 flex items-center justify-between px-7 py-5">

                            {/* LEFT */}
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                }}
                                onClick={() => nav("/dashboard")}
                                className="flex items-center gap-4 cursor-pointer"
                            >

                                {/* LOGO */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                    }}
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-red-500 via-yellow-400 to-green-500 flex items-center justify-center shadow-xl"
                                >

                                    <FaRobot className="text-2xl text-white" />

                                </motion.div>

                                {/* BRAND */}
                                <div>

                                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">

                                        AI Interview

                                    </h1>

                                    <p className="text-xs text-gray-500 tracking-widest uppercase">
                                        Smart Career Platform
                                    </p>

                                </div>

                            </motion.div>

                            {/* CENTER LINKS */}
                            <div className="hidden md:flex items-center gap-4">

                                {links.map((link, i) => (

                                    <NavLink
                                        key={i}
                                        to={link.path}
                                    >

                                        {({ isActive }) => (

                                            <motion.div
                                                whileHover={{
                                                    y: -4,
                                                    scale: 1.04,
                                                }}
                                                whileTap={{
                                                    scale: 0.96,
                                                }}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 shadow-sm

                                                ${isActive
                                                        ? `bg-gradient-to-r ${link.color} text-white shadow-lg`
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                    }`}
                                            >

                                                <motion.span
                                                    animate={{
                                                        y: [0, -2, 0],
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 2,
                                                        delay: i * 0.2,
                                                    }}
                                                    className="text-sm"
                                                >

                                                    {link.icon}

                                                </motion.span>

                                                <span className="font-semibold text-sm tracking-wide">

                                                    {link.name}

                                                </span>

                                            </motion.div>
                                        )}

                                    </NavLink>
                                ))}

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex items-center gap-5">

                                {/* PROGRESS */}
                                <div className="hidden lg:flex flex-col">

                                    <div className="flex items-center justify-between mb-2">

                                        <span className="text-xs text-gray-500">
                                            Interview Progress
                                        </span>

                                        <span className="text-xs font-bold text-blue-500">
                                            {step}/{total}
                                        </span>

                                    </div>

                                    <div className="w-44 h-2 bg-gray-200 rounded-full overflow-hidden">

                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${(step / total) * 100}%`,
                                            }}
                                            transition={{
                                                duration: 1,
                                            }}
                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-red-400 via-yellow-400 to-green-500"
                                        />

                                    </div>

                                </div>

                                {/* LOGOUT */}
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.92,
                                    }}
                                    onClick={() => {

                                        localStorage.removeItem("token");

                                        nav("/logout");
                                    }}
                                    className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-2xl shadow-lg font-medium"
                                >

                                    <motion.span
                                        animate={{
                                            rotate: [0, 12, -12, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                        }}
                                    >

                                        <FaSignOutAlt />

                                    </motion.span>

                                    Logout

                                </motion.button>

                            </div>

                        </div>

                    </div>

                </div>

            </motion.nav>

            {/* PAGE CONTENT */}
            <Loader />

        </div>
    );
}