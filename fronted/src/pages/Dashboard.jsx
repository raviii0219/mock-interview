// Dashboard.jsx

import { useState } from "react";

import API from "../api/auth/components/services/api";

import { useNavigate } from "react-router";

export default function Dashboard() {

    const [role, setRole] =
        useState(
            "Frontend Developer"
        );

    const [skills, setSkills] =
        useState("");

    const [experience, setExperience] =
        useState("");

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const nav = useNavigate();

    // 🚀 START INTERVIEW
    const startInterview =
        async () => {

            try {

                setLoading(true);

                let resumeText = "";

                // ✅ IF FILE EXISTS
                if (file) {

                    const formData =
                        new FormData();

                    formData.append(
                        "resume",
                        file
                    );

                    // 🚀 UPLOAD RESUME
                    const uploadRes =
                        await API.post(

                            "/auth/upload-resume",

                            formData,

                            {
                                headers: {
                                    "Content-Type":
                                        "multipart/form-data",
                                },
                            }
                        );

                    console.log(
                        uploadRes.data
                    );

                    // ✅ GET RESUME TEXT
                    resumeText =
                        uploadRes.data.text;

                    // SAVE
                    localStorage.setItem(
                        "resumeText",

                        resumeText
                    );
                }

                // 🚀 GENERATE QUESTIONS
                const res =
                    await API.post(

                        "/interview/generate-questions",

                        {

                            role,

                            skills,

                            experience,

                            resumeText,
                        }
                    );

                console.log(res.data);

                // ✅ SAVE QUESTIONS
                localStorage.setItem(

                    "questions",

                    JSON.stringify(
                        res.data.questions
                    )
                );

                // SAVE ROLE
                localStorage.setItem(
                    "role",
                    role
                );

                // 🚀 GO INTERVIEW
                nav("/interview");

            } catch (err) {

                console.log(err);

                alert(
                    "Error generating questions"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-5">

            <div className="bg-white shadow-2xl rounded-[35px] p-10 w-full max-w-2xl">

                <h1 className="text-4xl font-black text-gray-800 mb-8">

                    AI Interview Dashboard

                </h1>

                {/* ROLE */}
                <div className="mb-5">

                    <label className="font-bold text-gray-700 block mb-2">

                        Select Role

                    </label>

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }
                        className="w-full bg-gray-100 rounded-2xl p-4 outline-none"
                    >

                        <option>
                            Frontend Developer
                        </option>

                        <option>
                            Backend Developer
                        </option>

                        <option>
                            Full Stack Developer
                        </option>

                        <option>
                            HR Interview
                        </option>

                    </select>

                </div>

                {/* SKILLS */}
                <div className="mb-5">

                    <label className="font-bold text-gray-700 block mb-2">

                        Skills

                    </label>

                    <input
                        type="text"
                        placeholder="React, Node.js, MongoDB"
                        value={skills}
                        onChange={(e) =>
                            setSkills(
                                e.target.value
                            )
                        }
                        className="w-full bg-gray-100 rounded-2xl p-4 outline-none"
                    />

                </div>

                {/* EXPERIENCE */}
                <div className="mb-5">

                    <label className="font-bold text-gray-700 block mb-2">

                        Experience

                    </label>

                    <input
                        type="text"
                        placeholder="Fresher / 2 Years"
                        value={experience}
                        onChange={(e) =>
                            setExperience(
                                e.target.value
                            )
                        }
                        className="w-full bg-gray-100 rounded-2xl p-4 outline-none"
                    />

                </div>

                {/* RESUME */}
                <div className="mb-8">

                    <label className="font-bold text-gray-700 block mb-2">

                        Upload Resume

                    </label>

                    <input
                        type="file"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                        className="w-full bg-gray-100 rounded-2xl p-4"
                    />

                </div>

                {/* BUTTON */}
                <button
                    onClick={startInterview}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl text-xl font-bold shadow-xl"
                >

                    {loading
                        ? "Generating..."
                        : "Start AI Interview"}

                </button>

            </div>

        </div>
    );
}