const ai = require('../services/ai.service')
const Interview = require("../models/interviewmodel")
const generateCertificate = require("../services/emailService")
const { analyzeAnswer } = require("../services/nlpServices")
const Sentiment =
    require("sentiment");

const nlp =
    require("compromise");

const sentiment =
    new Sentiment();

// interview.controller.js

const generateQuestions = async (req, res) => {

    try {

        //  GET DATA
        const {
            role,
            skills,
            experience,
            resumeText,
        } = req.body;

        //  VALIDATION
        if (!role) {

            return res.status(400).json({

                success: false,

                message: "Role is required",
            });
        }

        // 🚀 AI PROMPT
        const prompt = `

You are an expert technical interviewer.

Generate professional interview questions
based on the candidate resume and role.

Candidate Details:

Role:
${role}

Skills:
${skills || "Not Provided"}

Experience:
${experience || "Fresher"}

Resume Content:
${resumeText || "No Resume Uploaded"}

Rules:

- Generate maximum 5 interview questions
- Questions must depend on the resume
- Questions must depend on projects
- Questions must depend on skills
- Include technical questions
- Include project based questions
- Include practical interview questions
- Include role specific questions
- Each question on a new line
- No numbering
- No bullet points
- No explanation
- Professional interview style

`;

        //  GOOGLE GEMINI API
        const result =
            await ai.models.generateContent({

                model:
                    "gemini-3-flash-preview",

                contents: prompt,
            });

        //  RAW RESPONSE
        const rawText =
            result?.candidates?.[0]
                ?.content?.parts?.[0]
                ?.text || "";

        //  CLEAN QUESTIONS
        const questions = rawText

            .split("\n")

            .map((q) =>

                q
                    .replace(
                        /^\d+[\).\s-]*/,
                        ""
                    )

                    .replace(
                        /^[-*]\s*/,
                        ""
                    )

                    .trim()
            )

            .filter((q) => q.length > 8)

            .slice(0, 10);

        //  RESPONSE
        res.status(200).json({

            success: true,

            message:
                "Questions generated successfully 🚀",

            role,

            totalQuestions:
                questions.length,

            questions,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to generate questions",

            error: error.message,
        });
    }
};



// TEST AI
const testAI = async (req, res) => {

    try {

        const result = await ai.models.generateContent({

            model: "gemini-3-flash-preview",

            contents: "Hello",
        });

        res.status(200).json({

            success: true,

            reply:
                result?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            error: error.message,
        });
    }
};
const evaluateAnswers =
    async (req, res) => {

        try {

            const {
                question,
                answer,
            } = req.body;

            //  VALIDATION
            if (
                !question ||
                !answer
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Question and answer required",
                });
            }

            console.log(
                "QUESTION:",
                question
            );

            console.log(
                "ANSWER:",
                answer
            );

            //  NLP ANALYSIS

            // WORD COUNT
            const wordCount =
                answer.split(" ").length;

            // SENTIMENT
            const sentimentResult =
                sentiment.analyze(answer);

            // KEYWORDS
            const keywords =
                nlp(answer)
                    .nouns()
                    .out("array");

            // CONFIDENCE
            let confidence =
                "Low";

            if (wordCount > 40) {

                confidence =
                    "High";

            } else if (
                wordCount > 20
            ) {

                confidence =
                    "Medium";
            }

            //  AI PROMPT
            const prompt = `

You are an expert technical interviewer.

Evaluate the candidate answer professionally.

Interview Question:
${question}

Candidate Answer:
${answer}

NLP Analysis:

Confidence:
${confidence}

Word Count:
${wordCount}

Detected Keywords:
${keywords.join(", ")}

Sentiment Score:
${sentimentResult.score}

Instructions:

- Evaluate technical knowledge
- Evaluate communication
- Evaluate confidence
- Evaluate clarity
- Evaluate problem solving ability
- Give professional feedback
- Give score out of 10
- Keep feedback short and professional

Format:

Feedback:
<professional feedback>

Score:
<number>/10

`;

            //  GEMINI
            const result =
                await ai.models.generateContent({

                    model:
                        "gemini-3-flash-preview",
                    contents:
                        prompt,
                });

            console.log(result);

            // 🚀 SAFE AI RESPONSE
            const aiResponse =

                result?.candidates?.[0]
                    ?.content?.parts?.[0]
                    ?.text ||

                "Good answer. Score: 7/10";

            console.log(
                "AI RESPONSE:",
                aiResponse
            );

            // 🚀 EXTRACT SCORE
            let score = 7;

            const match =
                aiResponse.match(
                    /([0-9]|10)\/10/
                );

            if (match) {

                score =
                    Number(
                        match[1]
                    );
            }

            //  RESPONSE
            res.status(200).json({

                success: true,

                feedback:
                    aiResponse,

                score,

                nlp: {

                    confidence,

                    wordCount,

                    sentimentScore:
                        sentimentResult.score,

                    keywords,
                },
            });

        } catch (error) {

            console.log(
                "EVALUATION ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                error:
                    error.message,
            });
        }
    };
const generateCodingQuestion = async (req, res) => {
    const prompt = `Generate a coding question for interview with solution and explanation.`
    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    res.json({
        message: "coding question generated successfully",
        data: result.candidates[0].content.parts[0].text
    })
}
const getAnalytics = async (req, res) => {
    try {
        const interviews = await Interview.find({
            userId: req.params.id
        })
        let total = 0;
        interviews.forEach(item => {
            total += item.score;
        });
        const average = total / interviews.length;
        res.json({
            totalInterviews: interviews.length,
            averageScore: average
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message,
        })
    }
}

const saveInterview = async (req, res) => {
    try {
        const { userId, score, role, email } = req.body;
        const interview = await Interview.create({
            userId,
            score,
            role,

        });
        res.json({
            message: "interview saved successfully",
            data: interview,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message,
        })
    }
}
const getCertificate = async (req, res) => {
    const name = req.body.name;
    generateCertificate(name, res);
}


module.exports = { generateQuestions, testAI, evaluateAnswers, generateCodingQuestion, getAnalytics, saveInterview, getCertificate }