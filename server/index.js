const connectToMongo = require("./db");
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;
app.use(express.json());

// Authentication
app.use("/api/signup", require("./routes/Auth/signup"));
app.use("/api/login", require("./routes/Auth/login"));

// Users
app.use("/api/getUser", require("./routes/Users/getUser"));
app.use("/api/allUser", require("./routes/Users/allUsers"));

// Posts
app.use("/api/post", require("./routes/Posts/newPost"));
app.use("/api/likePost", require("./routes/Posts/likePost"));
app.use("/api/allPosts", require("./routes/Posts/allPosts"));
app.use("/api/delPost", require("./routes/Posts/delPost"));

app.listen(port, () => {
    console.log(`ChatMeow server listening on port ${port}`)
})
