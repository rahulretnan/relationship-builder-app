import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import personRoutes from "./routes/person.js";
import tagRoutes from "./routes/tag.js";
import relationRoutes from "./routes/relation.js";
dotenv.config();
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/person", personRoutes);
app.use("/tag", tagRoutes);
app.use("/relation", relationRoutes);
app.get('/',(req,res)=>{
  res.send('Hello From Relationship Builder api');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at port:${PORT}`))
  )
  .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);
