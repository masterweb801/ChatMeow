const connectToMongo = require("./db");
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;
app.use(express.json());

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/getUser", require("./routes/getUser"));

app.listen(port, () => {
    console.log(`ChatMeow server listening on port ${port}`)
})
