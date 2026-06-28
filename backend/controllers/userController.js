const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err)
                    return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(name, email, password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    (err) => {

                        if (err)
                            return res.status(500).json(err);

                        res.json({
                            message: "User Registered Successfully"
                        });

                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};

// Login User
const loginUser = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                message: "Login Successful",
                token
            });

        }
    );

};

module.exports = {
    registerUser,
    loginUser
};