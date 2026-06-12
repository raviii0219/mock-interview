const express =
    require("express");

const router =
    express.Router();

const {

    saveFace,

    verifyFace,

} = require(
    "../controllers/facecontroller"
);

router.post(
    "/save-face",
    saveFace
);

router.post(
    "/verify-face",
    verifyFace
);

module.exports =
    router;