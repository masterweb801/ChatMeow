const connectToMongo = require("./db");
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;
app.use(express.json());

// Authentication
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/getUser", require("./routes/getUser"));

// Post
app.use("/api/post", require("./routes/newPost"));
app.use("/api/likePost", require("./routes/likePost"));
app.use("/api/allPosts", require("./routes/allPosts"));
app.use("/api/delPost", require("./routes/delPost"));

app.listen(port, () => {
    console.log(`ChatMeow server listening on port ${port}`)
})
