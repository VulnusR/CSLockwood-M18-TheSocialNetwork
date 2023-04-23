const mongoose = require('mongoose');
const express = require('express');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));




mongoose.connect( process.env.MONGODB_URI || `mongodb://localhost/Module-18`, {
    //mongodb+srv://mod18API:zQs6vfnGNPTcumOp@module-18.6oucric.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("debug", true);
app.use("/", routes);
app.listen(PORT, () => console.log(`----- App is lsitening on port ${PORT} ----`))

