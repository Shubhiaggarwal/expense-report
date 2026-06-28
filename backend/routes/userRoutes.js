const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

const {
    registerValidation,
    loginValidation
} = require("../validation/userValidation");

const validate = require("../middleware/validationMiddleware");

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);

router.post(
    "/login",
    loginValidation,
    validate,
    loginUser
);

module.exports = router;