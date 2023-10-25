import express from "express";
import dotenv from "dotenv";
import studentsRouter from "./routes/studentsRouter";
import cors from "cors";
import professionalsRouter from "./routes/professionalsRouter";

dotenv.config();

const app = express();

// Utiliza o middleware CORS para permitir requisições de diferentes origens
app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);

app.use((req, res) => {
  res.status(404);
});

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h3 style='color: green'>Hello World</h3>");
});

app.use("/students", studentsRouter);
app.use("/professionals", professionalsRouter);

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
