// auth.routes.js

const express = require("express");

const router = express.Router();

const multer = require("multer");

const fs = require("fs");

const path = require("path");

const pdfParse = require("pdf-parse");

const mammoth = require("mammoth");

const authMiddleware = require(
    "../middlewares/auth.middleware"
);

const authConroller = require(
    "../controllers/auth.controller"
);

//  UPLOAD FOLDER
const uploadPath = path.join(
    __dirname,
    "../uploads"
);

//  CREATE FOLDER
if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, {
        recursive: true,
    });
}

// STORAGE
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {

        cb(
            null,
            Date.now() +
            "-" +
            file.originalname
        );
    },
});

//  ALL FILE TYPES ALLOWED
const upload = multer({
    storage,
});

//  REGISTER
router.post(
    "/register",
    upload.single("avatar"),
    authConroller.register
);

//  LOGIN
router.post(
    "/login",
    authConroller.userLogin
);

//  LOGOUT
router.get(
    "/logout",
    authConroller.logout
);

//  UPLOAD RESUME / CV / PPT / DOC / IMAGE
router.post(
    "/upload-resume",

    upload.single("resume"),

    async (req, res) => {

        try {

            //  NO FILE
            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No file uploaded",
                });
            }

            const filePath =
                req.file.path;

            const ext = path.extname(
                req.file.originalname
            ).toLowerCase();

            let extractedText = "";

            //  PDF
            if (ext === ".pdf") {

                try {

                    const dataBuffer =
                        fs.readFileSync(
                            filePath
                        );

                    const pdfData =
                        await pdfParse(
                            dataBuffer
                        );

                    extractedText =
                        pdfData.text;

                } catch (err) {

                    extractedText =
                        "PDF uploaded but text could not be extracted";
                }
            }

            //  DOCX
            else if (
                ext === ".docx"
            ) {

                try {

                    const result =
                        await mammoth.extractRawText(
                            {
                                path: filePath,
                            }
                        );

                    extractedText =
                        result.value;

                } catch (err) {

                    extractedText =
                        "DOCX uploaded successfully";
                }
            }

            //  DOC
            else if (
                ext === ".doc"
            ) {

                extractedText =
                    "DOC file uploaded successfully";
            }

            //  PPT / PPTX
            else if (
                ext === ".ppt" ||
                ext === ".pptx"
            ) {

                extractedText =
                    "PPT file uploaded successfully";
            }

            //  IMAGE
            else if (
                ext === ".png" ||
                ext === ".jpg" ||
                ext === ".jpeg"
            ) {

                extractedText =
                    "Image uploaded successfully";
            }

            //  OTHER FILES
            else {

                extractedText =
                    "File uploaded successfully";
            }

            //  RESPONSE
            res.status(200).json({

                success: true,

                message:
                    "File uploaded successfully",

                fileName:
                    req.file.originalname,

                fileType:
                    req.file.mimetype,

                text: extractedText,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                error: error.message,
            });
        }
    }
);

//  GET ME
router.get(
    "/get-me",
    authMiddleware.authUser,
    authConroller.getMeController
);

//  LEADERBOARD
router.get(
    "/leaderboard",
    authConroller.getLeaderboard
);

//  ADMIN STATS
router.get(
    "/admin/stats",
    authConroller.getAdminStats
);

module.exports = router;