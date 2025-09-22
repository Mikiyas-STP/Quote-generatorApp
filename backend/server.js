import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(cors());
app.use(express.json());

const quotes = [
  { author: "Benjamin Franklin", quote: "Either write something worth reading or do something worth writing." },
  { author: "Clive James", quote: "I should have been more kind." },
];

app.get("/", (req, res) => {
  const index = Math.floor(Math.random() * quotes.length);
  res.json(quotes[index]);
});

app.post("/quotes", (req, res) => {
  const { author, quote } = req.body;
  if (author && quote && author.trim() !== "" && quote.trim() !== "") {
    quotes.push({ author: author.trim(), quote: quote.trim() });
    res.status(201).json({ success: true, message: "Quote added successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid input. Both quote and author are required" });
  }
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

//http://127.0.0.1:3000/
// fetch random quote (GET)
// curl http://127.0.0.1:3000/
