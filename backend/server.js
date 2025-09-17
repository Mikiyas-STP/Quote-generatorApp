import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());   // <-- THIS LINE IS CRUCIAL

const quotes = [
  { author: "Benjamin Franklin", quote: "Either write something worth reading or do something worth writing." },
  { author: "Clive James", quote: "I should have been more kind." },
];

app.get("/", (req, res) => {
  const index = Math.floor(Math.random() * quotes.length);
  res.json(quotes[index]);
});

app.post("/", (req, res) => {
  const { author, quote } = req.body;
  if (!author || !quote) {
    return res.status(400).json({ error: "Author and quote are required" });
  }
  quotes.push({ author, quote });
  res.status(201).json({message:"Quote added", quotesCount: quotes.length});
});

app.listen(port, () => {
  console.log(`Quote server / Backend running on port ${port}`);
});



// To add a mew quote (POST)
// curl -X POST -H "Content-Type: application/json" \
//   --data '{"author":"Ibrahim","quote":"Hello"}' \
//   http://127.0.0.1:3000/

// fetch random quote (GET)
// curl http://127.0.0.1:3000/
