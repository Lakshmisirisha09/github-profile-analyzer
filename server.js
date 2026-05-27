const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const githubRoutes = require("./routes/githubRoutes");

app.use("/api", githubRoutes);

app.get("/", (req, res) => {
    res.send("GitHub Profile Analyzer API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});