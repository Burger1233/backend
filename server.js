import express from 'express'
import cors from 'cors'
import users from './api/users.route.js'
import login from './api/login.route.js'
import usersnb from './api/usersnb.route.js'

const app = express();
//const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users)
app.use("/api/v1/login", login)
app.use("/api/v1/usersnb", usersnb)

app.use("*", (req, res) => res.status(404).json(
    { error: "not found" }
))

app.get("/", (req, res) => {
    res.send("Hello World!");
});


export default app;

/*

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
*/