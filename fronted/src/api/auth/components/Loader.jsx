// components/Loader.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
// import Dashboard from '../'

export default function Loader() {
    const nav = useNavigate();

    const floating = {
        animate: {
            y: [0, -12, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

            {/* BACKGROUND GLOW */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/30 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/30 blur-[120px]" />

            {/* MAIN SECTION */}
            <div className="relative z-10 px-6 py-12">

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >

                        {/* BADGE */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-xl"
                        >
                            AI Powered Career Assistant
                        </motion.div>

                        {/* HEADING */}
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                            Ace Your <br />

                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                Mock Interview
                            </span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                            Practice with real AI interviewers, improve communication,
                            receive smart analytics, and become job-ready faster than ever.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-4">

                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0px 0px 25px rgb(168 85 247)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => nav("/dashboard")}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-2xl font-semibold shadow-2xl"
                            >
                                Start Interview 🚀
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => nav("/analytics")}
                                className="bg-white/10 border border-white/20 px-8 py-4 rounded-2xl backdrop-blur-xl"
                            >
                                View Analytics 📊
                            </motion.button>

                        </div>

                        {/* TRUSTED USERS */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-10 flex items-center gap-4"
                        >
                            <div className="flex -space-x-3">
                                <img
                                    src="https://i.pravatar.cc/40?img=1"
                                    className="w-10 h-10 rounded-full border-2 border-black"
                                />
                                <img
                                    src="https://i.pravatar.cc/40?img=2"
                                    className="w-10 h-10 rounded-full border-2 border-black"
                                />
                                <img
                                    src="https://i.pravatar.cc/40?img=3"
                                    className="w-10 h-10 rounded-full border-2 border-black"
                                />
                            </div>

                            <p className="text-sm text-gray-300">
                                Trusted by <span className="font-bold text-white"></span> students
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >

                        {/* MAIN GLASS CARD */}
                        <motion.div
                            variants={floating}
                            animate="animate"
                            className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                        >

                            <div className="grid grid-cols-2 gap-5">

                                {/* CARD */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 p-5 rounded-2xl"
                                >
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h3 className="font-bold text-lg">
                                        Accuracy
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">
                                        AI improves your answers instantly
                                    </p>
                                </motion.div>

                                {/* CARD */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 p-5 rounded-2xl"
                                >
                                    <div className="text-4xl mb-3">⚡</div>
                                    <h3 className="font-bold text-lg">
                                        Fast Analysis
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">
                                        Real-time interview evaluation
                                    </p>
                                </motion.div>

                                {/* CARD */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 p-5 rounded-2xl"
                                >
                                    <div className="text-4xl mb-3">📊</div>
                                    <h3 className="font-bold text-lg">
                                        Analytics
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">
                                        Track progress & performance
                                    </p>
                                </motion.div>

                                {/* CARD */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 p-5 rounded-2xl"
                                >
                                    <div className="text-4xl mb-3">🤖</div>
                                    <h3 className="font-bold text-lg">
                                        AI Powered
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">
                                        Smart mock interview system
                                    </p>
                                </motion.div>

                            </div>
                        </motion.div>

                        {/* FLOATING CIRCLE */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-2xl opacity-40"
                        />

                    </motion.div>

                </div>

                {/* STATS SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="max-w-7xl mx-auto mt-20 grid md:grid-cols-3 gap-6"
                >

                    {[
                        {
                            number: "100+",
                            text: "Interview Questions",
                            icon: "📚",
                        },
                        {
                            number: "95%",
                            text: "Selection Success",
                            icon: "🏆",
                        },
                        {
                            number: "24/7",
                            text: "AI Availability",
                            icon: "⏰",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                            }}
                            className="bg-white/10 border border-white/10 backdrop-blur-xl p-8 rounded-3xl text-center shadow-lg"
                        >
                            <div className="text-5xl mb-3">
                                {item.icon}
                            </div>

                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                {item.number}
                            </h2>

                            <p className="text-gray-300 mt-3">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}

                </motion.div>

            </div>

            {/* WHY CHOOSE US SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-7xl mx-auto mt-28"
            >
                <div className="text-center mb-16">

                    <motion.h2
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="text-5xl font-extrabold mb-5"
                    >
                        Why Students Love{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Our Platform
                        </span>
                    </motion.h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Experience next-generation AI interview preparation with
                        beautiful analytics, smart feedback, and real-world simulations.
                    </p>
                </div>

                {/* FEATURE CARDS */}
                <div className="grid md:grid-cols-3 gap-8">

                    {[
                        {
                            icon: "🧠",
                            title: "Smart AI Analysis",
                            desc: "AI deeply analyzes your communication, confidence, and technical answers."
                        },
                        {
                            icon: "🎤",
                            title: "Voice Interviews",
                            desc: "Practice real-time voice interviews like actual company rounds."
                        },
                        {
                            icon: "📈",
                            title: "Performance Growth",
                            desc: "Track your improvement with beautiful performance analytics."
                        },
                        {
                            icon: "⚡",
                            title: "Instant Feedback",
                            desc: "Get AI-generated feedback immediately after every answer."
                        },
                        {
                            icon: "🌍",
                            title: "Industry Questions",
                            desc: "Practice real company-level interview questions from top domains."
                        },
                        {
                            icon: "🏆",
                            title: "Confidence Booster",
                            desc: "Improve communication and confidence with daily mock sessions."
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 1,
                            }}
                            className="relative overflow-hidden bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-xl group"
                        >

                            {/* GLOW EFFECT */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

                            <div className="relative z-10">
                                <div className="text-6xl mb-5">
                                    {item.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </motion.div>


            {/* TESTIMONIAL SECTION */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-7xl mx-auto mt-32"
            >

                <div className="text-center mb-14">
                    <h2 className="text-5xl font-extrabold mb-4">
                        Success Stories 💬
                    </h2>

                    <p className="text-gray-400">
                        Thousands of students improved their interview skills.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {[
                        {
                            name: "Rahul Sharma",
                            role: "Frontend Developer",
                            text: "This AI interview platform helped me crack my first tech interview confidently."
                        },
                        {
                            name: "Priya Singh",
                            role: "Data Analyst",
                            text: "The analytics and feedback system is amazing. It improved my communication a lot."
                        },
                        {
                            name: "Aman Verma",
                            role: "Backend Developer",
                            text: "Feels like a real interview experience. Beautiful UI and super useful AI feedback."
                        }
                    ].map((user, i) => (
                        <motion.div
                            key={i}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                            }}
                            className="bg-white/10 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                        >

                            {/* QUOTE */}
            {/* <div className="absolute top-4 right-5 text-6xl opacity-10">
                                "
                            </div> */}

            {/* <div className="flex items-center gap-4 mb-5">

                                <img
                                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                    className="w-14 h-14 rounded-full border-2 border-purple-400"
                                />

                                <div>
                                    <h3 className="font-bold text-lg">
                                        {user.name}
                                    </h3>

                                    <p className="text-sm text-purple-300">
                                        {user.role}
                                    </p>
                                </div>
                            </div> */}

            {/* <p className="text-gray-300 leading-relaxed">
                                {user.text}
                            </p> */}

            {/* STARS */}
            {/* <div className="mt-5 text-yellow-400 text-xl">
                                ⭐⭐⭐⭐⭐
                            </div> */}

            {/* </motion.div>
                    ))}
                </div>
            </motion.div> */} */


            {/* CTA SECTION */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="max-w-6xl mx-auto mt-32 mb-20"
            >

                <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 p-[1px]">

                    <div className="bg-[#0b1020] rounded-[40px] px-10 py-20 text-center relative overflow-hidden">

                        {/* BACKGROUND EFFECT */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 blur-[120px]" />
                            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 blur-[120px]" />
                        </div>

                        <div className="relative z-10">

                            <motion.h2
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                }}
                                className="text-5xl md:text-6xl font-extrabold mb-6"
                            >
                                Ready to Crack <br />
                                Your Dream Job? 🚀
                            </motion.h2>

                            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
                                Start practicing today with our AI-powered mock interview
                                platform and boost your confidence like never before.
                            </p>

                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0px 0px 35px rgba(255,255,255,0.6)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl" onClick={() => nav("/dashboard")}

                            >
                                Start Free Interview 🎯
                            </motion.button>

                        </div>
                    </div>
                </div>
            </motion.div>
            <footer className="max-w-7xl mx-auto mt-28 border-t border-white/10 pt-10 pb-6">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* LOGO */}
                    <div>

                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            AI Interview
                        </h2>

                        <p className="text-gray-400 mt-4 leading-relaxed">
                            Future-ready AI mock interview platform
                            helping students crack interviews with confidence.
                        </p>

                    </div>

                    {/* LINKS */}
                    <div>

                        <h3 className="text-xl font-bold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li className="hover:text-white cursor-pointer transition-all" onClick={() => { nav("/home") }}  >
                                Home
                            </li>

                            <li className="hover:text-white cursor-pointer transition-all" onClick={() => { nav("/analytics") }}>
                                Analytics
                            </li>

                            <li className="hover:text-white cursor-pointer transition-all" onClick={() => { nav("/resume") }}>
                                Resume Upload
                            </li>

                            {/* <li className="hover:text-white cursor-pointer transition-all">
                                Contact
                            </li> */}

                        </ul>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="text-xl font-bold mb-4">
                            Platform Stats
                        </h3>

                        <div className="space-y-4">

                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                                Interviews Conducted
                            </div>

                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                                🤖 AI Accuracy Rate: 98%
                            </div>

                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                                Trusted by Developers Worldwide
                            </div>

                        </div>

                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="text-center text-gray-500 mt-12 border-t border-white/10 pt-6">

                    © 2026 AI Mock Interview Platform • Built with React & AI

                </div>

            </footer>

        </div>
    );
}