import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import apiRoutes from "./routes/routes";
import path from "path"

dotenv.config();
const app = express();
app.use(bodyParser.json()); //definindo tamanho limite das requisições
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use("/api", apiRoutes); // cada rota dentro de apiRoutes vai iniciar com /api

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

/* const MONGODB_URI =
  "mongodb+srv://hugolc:qweasd123@cluster0.ilbnty4.mongodb.net/tudo-mato?retryWrites=true"; */
const PORT = process.env.PORT || 6969;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
