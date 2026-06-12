import { useState } from "react";
import API from "../api/auth/components/services/api";
import { motion } from "framer-motion";

import {
    FaCloudUploadAlt,
    FaFilePdf,
    FaCheckCircle
} from "react-icons/fa";

import { MdError } from "react-icons/md";

export default function ResumeUpload() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    // HANDLE FILE
    const handleFile = (e) => {

        const selected = e.target.files[0];

        if (selected) {

            setFile(selected);

            const fileURL = URL.createObjectURL(selected);

            setPreviewUrl(fileURL);
        }
    };

    // UPLOAD FUNCTION
    const uploadResume = async () => {

        if (!file) {
            return setMessage("⚠️ Please select a resume first");
        }

        try {

            setLoading(true);

            const formData = new FormData();
            formData.append("resume", file);

            await API.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage("✅ Resume Uploaded Successfully");

        } catch (err) {

            console.log(err);

            setMessage("❌ Upload Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-[#040814] overflow-hidden relative text-white">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/30 blur-[140px]" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/30 blur-[140px]" />

            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink-500/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            {/* FLOATING CIRCLES */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                }}
                className="absolute top-20 left-20 w-24 h-24 rounded-full bg-purple-500/20 border border-purple-500/30"
            />

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                }}
                className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-blue-500/20 border border-blue-500/30"
            />

            {/* MAIN CONTAINER */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-10">

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-7xl grid lg:grid-cols-2 gap-10"
                >

                    {/* LEFT SIDE */}
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)]">

                        {/* HEADER */}
                        <div className="relative p-10 overflow-hidden border-b border-white/10">

                            {/* HEADER GLOW */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10" />

                            <div className="relative z-10">

                                {/* ICON */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 4,
                                    }}
                                    className="w-28 h-28 rounded-[30px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(168,85,247,0.6)]"
                                >
                                    <FaCloudUploadAlt className="text-6xl text-white" />
                                </motion.div>

                                {/* TITLE */}
                                <h1 className="text-5xl font-extrabold text-center mt-8 leading-tight">

                                    Upload Your <br />

                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                        AI Resume
                                    </span>

                                </h1>

                                <p className="text-center text-gray-300 mt-5 max-w-lg mx-auto leading-relaxed">
                                    Upload your resume and preview it instantly with our
                                    futuristic AI-powered platform.
                                </p>

                            </div>
                        </div>

                        {/* BODY */}
                        <div className="p-10">

                            {/* DROP ZONE */}
                            <motion.label
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "rgba(168,85,247,0.7)",
                                }}
                                className="relative border-2 border-dashed border-white/20 rounded-[35px] p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-all overflow-hidden"
                            >

                                {/* SHINE EFFECT */}
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full" />

                                <motion.div
                                    animate={{
                                        scale: [1, 1.08, 1],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                    }}
                                >
                                    <FaFilePdf className="text-7xl text-red-400 mb-5" />
                                </motion.div>

                                <h2 className="text-2xl font-bold">
                                    Drag & Drop Resume
                                </h2>

                                <p className="text-gray-400 mt-3">
                                    Upload your PDF file instantly
                                </p>

                                <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-2xl font-semibold shadow-xl">
                                    Browse File
                                </div>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFile}
                                    className="hidden"
                                />

                            </motion.label>

                            {/* FILE DETAILS */}
                            {file && (

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 bg-white/10 border border-white/10 rounded-3xl p-5 flex items-center gap-4"
                                >

                                    <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                                        <FaFilePdf className="text-3xl text-red-400" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg truncate">
                                            {file.name}
                                        </h3>

                                        <p className="text-gray-400 text-sm">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <FaCheckCircle className="text-3xl text-green-400" />

                                </motion.div>
                            )}

                            {/* BUTTON */}
                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0px 0px 40px rgba(168,85,247,0.5)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={uploadResume}
                                disabled={loading}
                                className="relative overflow-hidden w-full mt-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-5 rounded-3xl font-bold text-xl shadow-2xl"
                            >

                                {/* BUTTON SHINE */}
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full" />

                                <span className="relative z-10">
                                    {loading ? "Uploading..." : "Upload Resume 🚀"}
                                </span>

                            </motion.button>

                            {/* LOADING */}
                            {loading && (

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-8 text-center"
                                >

                                    <div className="w-14 h-14 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto" />

                                    <p className="mt-4 text-gray-300">
                                        AI is processing your resume...
                                    </p>

                                </motion.div>
                            )}

                            {/* MESSAGE */}
                            {message && (

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mt-6 p-5 rounded-3xl flex items-center justify-center gap-3 font-semibold
                                    
                                    ${message.includes("Successfully")
                                            ? "bg-green-500/20 border border-green-500/30 text-green-300"
                                            : "bg-red-500/20 border border-red-500/30 text-red-300"
                                        }`}
                                >

                                    {message.includes("Successfully")
                                        ? <FaCheckCircle />
                                        : <MdError />
                                    }

                                    {message}

                                </motion.div>
                            )}

                        </div>
                    </div>

                    {/* RIGHT SIDE PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.25)]"
                    >

                        {/* PREVIEW HEADER */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    Resume Preview 👀
                                </h2>

                                <p className="text-gray-400 mt-1">
                                    Live preview of uploaded resume
                                </p>
                            </div>

                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                }}
                                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
                            >
                                <FaFilePdf className="text-2xl" />
                            </motion.div>

                        </div>

                        {/* PDF PREVIEW */}
                        <div className="h-[750px] bg-black/20">

                            {!previewUrl ? (

                                <div className="h-full flex flex-col items-center justify-center text-center px-10">

                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 3,
                                        }}
                                    >
                                        <FaFilePdf className="text-8xl text-gray-500 mb-8" />
                                    </motion.div>

                                    <h2 className="text-3xl font-bold mb-4">
                                        No Resume Uploaded
                                    </h2>

                                    <p className="text-gray-400 max-w-md leading-relaxed">
                                        Upload your resume and its preview
                                        will appear here instantly.
                                    </p>

                                </div>

                            ) : (

                                <iframe
                                    src={previewUrl}
                                    title="Resume Preview"
                                    className="w-full h-full bg-white"
                                />

                            )}

                        </div>

                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}