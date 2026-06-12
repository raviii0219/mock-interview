const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewcontroller")
router.post("/generate-questions", interviewController.generateQuestions)
router.get("/test-ai", interviewController.testAI)
router.post("/evaluate", interviewController.evaluateAnswers)
router.post("/coding-question", interviewController.generateCodingQuestion)
router.get("/analytics/:id", interviewController.getAnalytics)
router.post('/save', interviewController.saveInterview)
router.get("/certificate/:name", interviewController.getCertificate)

module.exports = router;