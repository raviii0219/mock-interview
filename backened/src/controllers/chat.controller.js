const { GoogleGenAI } =
    require("@google/genai");

const ai =
    new GoogleGenAI({

        apiKey:
            process.env.GEMINI_API_KEY,
    });

// 🚀 CHATBOT
const chatWithAI =
    async (req, res) => {

        try {

            const {
                message,
            } = req.body;

            if (!message) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Message required",
                });
            }

            //  PROMPT
            const prompt = `

You are an AI Interview Assistant.

Help users with:
- Interview preparation
- HR questions
- Technical questions
- Resume guidance
- Career advice
- Coding concepts

User Question:
${message}

Give professional and short answers.

`;

            //  GEMINI
            const result =
                await ai.models.generateContent({

                    model: "gemini-3-flash-preview",


                    contents:
                        prompt,
                });

            // SAFE RESPONSE
            const reply =

                result?.candidates?.[0]
                    ?.content?.parts?.[0]
                    ?.text ||

                "I could not understand.";

            res.status(200).json({

                success: true,

                reply,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                error:
                    error.message,
            });
        }
    };

module.exports = {
    chatWithAI
};