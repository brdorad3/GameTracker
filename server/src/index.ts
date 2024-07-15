import express from "express";
import cors from "cors"


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
  };

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get("/", (req, res)=>{
  
    res.send("ez")
})
app.post("/", (req,res)=>{
    console.log(req.body)
    res.send(req.body.a)
})

app.listen(3000, () => {
    console.log("up")
});