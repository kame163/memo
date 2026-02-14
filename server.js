const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, "memo.txt");

app.use(express.json());
app.use(express.static(__dirname));

app.get("/memos", (req, res) => {
  if (!fs.existsSync(filePath)) return res.json([]);
  const data = fs.readFileSync(filePath, "utf8");
  const memos = data.split("\n").filter(line => line.trim() !== "");
  res.json(memos);
});

app.post("/memos", (req, res) => {
  const memo = req.body.memo;
  if (!memo) return res.sendStatus(400);
  fs.appendFileSync(filePath, memo + "\n");
  res.sendStatus(200);
});

app.delete("/memos/:index", (req, res) => {
  if (!fs.existsSync(filePath)) return res.sendStatus(404);

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter(line => line.trim() !== "");

  const index = parseInt(req.params.index);
  if (index < 0 || index >= lines.length) return res.sendStatus(400);

  lines.splice(index, 1);

  fs.writeFileSync(filePath, lines.join("\n") + "\n");
  res.sendStatus(200);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("サーバー起動中 http://localhost:3000");
});