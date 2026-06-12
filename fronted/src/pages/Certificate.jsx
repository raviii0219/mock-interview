// Analytics.jsx

import { useEffect, useState } from "react";
import API from "../api/auth/components/services/api";
import { motion } from "framer-motion";

import {
    FaChartLine,
    FaTrophy,
    FaBrain,
    FaCheckCircle,
    FaStar,
    FaUserTie,
    FaRobot,
} from "react-icons/fa";

export default function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const userId =
                    localStorage.getItem("userId");

                const res = await API.get(
                    `/interview/analytics/${userId}`
                );

                setAnalytics(res.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchAnalytics();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                />

            </div>
        );
    }

    if (!analytics) {

        return (

            <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl font-bold">

                No Analytics Found

            </div>
        );
    }

    const performance =
        analytics.averageScore > 7
            ? "Excellent"
            : analytics.averageScore > 5
                ? "Good"
                : "Needs Improvement";

    return (

        <div className="min-h-screen bg-[#f5f7fb] px-5 py-10 relative overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-400/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-400/20 blur-[140px]" />

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-5xl font-black text-gray-800">
                        AI Analytics Dashboard
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                        Smart interview performance report
                    </p>

                </div>

                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 via-red-400 via-yellow-400 to-green-500 p-1 shadow-2xl">

                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">

                        <h2 className="text-4xl font-black text-gray-800">
                            {analytics.averageScore?.toFixed(1)}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Avg Score
                        </p>

                    </div>

                </div>

            </div>

            {/* CARDS */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 mb-10">

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[30px] shadow-xl p-7"
                >

                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <FaUserTie className="text-blue-500 text-2xl" />
                    </div>

                    <h3 className="text-gray-500 mt-5">
                        Total Interviews
                    </h3>

                    <h2 className="text-4xl font-black text-gray-800 mt-2">
                        {analytics.totalInterviews}
                    </h2>

                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[30px] shadow-xl p-7"
                >

                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                        <FaChartLine className="text-green-500 text-2xl" />
                    </div>

                    <h3 className="text-gray-500 mt-5">
                        Average Score
                    </h3>

                    <h2 className="text-4xl font-black text-gray-800 mt-2">
                        {analytics.averageScore?.toFixed(1)}/10
                    </h2>

                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[30px] shadow-xl p-7"
                >

                    <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                        <FaTrophy className="text-yellow-500 text-2xl" />
                    </div>

                    <h3 className="text-gray-500 mt-5">
                        Performance
                    </h3>

                    <h2 className="text-3xl font-black text-gray-800 mt-2">
                        {performance}
                    </h2>

                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[30px] shadow-xl p-7"
                >

                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                        <FaRobot className="text-purple-500 text-2xl" />
                    </div>

                    <h3 className="text-gray-500 mt-5">
                        AI Rating
                    </h3>

                    <h2 className="text-4xl font-black text-gray-800 mt-2">
                        98%
                    </h2>

                </motion.div>

            </div>

            {/* REPORT */}
            <div className="max-w-7xl mx-auto bg-white rounded-[35px] shadow-xl p-8">

                <div className="flex items-center gap-4 mb-8">

                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                        <FaBrain className="text-purple-500 text-2xl" />
                    </div>

                    <div>

                        <h2 className="text-3xl font-black text-gray-800">
                            AI Report
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Interview performance analysis
                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    <div className="bg-blue-50 rounded-2xl p-5 flex items-start gap-4">

                        <FaCheckCircle className="text-blue-500 text-xl mt-1" />

                        <div>

                            <h3 className="font-bold text-gray-800">
                                Communication Skills
                            </h3>

                            <p className="text-gray-600 mt-1">
                                Good speaking confidence and clarity.
                            </p>

                        </div>

                    </div>

                    <div className="bg-green-50 rounded-2xl p-5 flex items-start gap-4">

                        <FaStar className="text-green-500 text-xl mt-1" />

                        <div>

                            <h3 className="font-bold text-gray-800">
                                Technical Knowledge
                            </h3>

                            <p className="text-gray-600 mt-1">
                                Strong technical understanding and problem solving.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}