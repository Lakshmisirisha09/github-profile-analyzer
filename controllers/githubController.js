const axios = require("axios");
const db = require("../config/db");

exports.analyzeProfile = async (req, res) => {
    console.log("API HIT");

    try {

        const username = req.params.username;

        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const user = response.data;

        const data = [
            user.login,
            user.name,
            user.bio,
            user.public_repos,
            user.followers,
            user.following,
            user.html_url,
            user.avatar_url
        ];

        const sql = `
        INSERT INTO profiles
        (username, name, bio, public_repos, followers, following, profile_url, avatar_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name=VALUES(name),
        bio=VALUES(bio),
        public_repos=VALUES(public_repos),
        followers=VALUES(followers),
        following=VALUES(following),
        profile_url=VALUES(profile_url),
        avatar_url=VALUES(avatar_url)
        `;

        db.query(sql, data, (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Profile analyzed successfully",
                profile: user
            });
        });

    } catch (error) {

        res.status(404).json({
            message: "GitHub User Not Found"
        });
    }
};


exports.getAllProfiles = (req, res) => {

    const sql = "SELECT * FROM profiles";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


exports.getSingleProfile = (req, res) => {

    const username = req.params.username;

    const sql = "SELECT * FROM profiles WHERE username=?";

    db.query(sql, [username], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(result[0]);
    });
};