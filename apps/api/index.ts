import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Running with tsx!");
});

app.listen(PORT, () => console.log(`Live on http://localhost:${PORT}`));
