const userModel = require("../models/usermodel")
const jwt = require("jsonwebtoken")




// SAVE FACE
const saveFace =
    async (req, res) => {

        try {

            const {
                email,
                descriptor,
            } = req.body;

            const user =
                await userModel.findOne({

                    email,
                });

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found",
                });
            }

            user.faceDescriptor =
                descriptor;

            await user.save();

            res.status(200).json({

                success: true,

                message:
                    "Face saved successfully",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    error.message,
            });
        }
    };

// VERIFY FACE
const verifyFace =
    async (req, res) => {

        try {

            const {
                email,
                descriptor,
            } = req.body;

            const user =
                await userModel.findOne({

                    email,
                });

            if (
                !user ||
                !user.faceDescriptor
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Face not registered",
                });
            }

            // SIMPLE MATCH
            const saved =
                user.faceDescriptor;

            let diff = 0;

            for (
                let i = 0;
                i < saved.length;
                i++
            ) {

                diff += Math.abs(

                    saved[i] -
                    descriptor[i]
                );
            }

            const average =
                diff / saved.length;

            console.log(
                average
            );

            // MATCH
            if (average < 0.4) {

                const token =
                    jwt.sign({

                        id: user._id,
                    },

                        process.env.JWT_SECRET,

                        {
                            expiresIn:
                                "7d",
                        }
                    );

                return res.status(200).json({

                    success: true,

                    token,

                    user,
                });
            }

            res.status(401).json({

                success: false,

                message:
                    "Face not matched",
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    error.message,
            });
        }
    };

module.exports = {

    saveFace,

    verifyFace,
};