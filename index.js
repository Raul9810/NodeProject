const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const pokemon = require('./routes/pokemon');
const moves = require('./routes/moves');
const user = require('./routes/user');
const notFoundHandler = require('./middleware/notFoundHandler');
const cors = require('./middleware/corsHandler');
const auth = require('./middleware/auth');
const app = express();


app.use(cors);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use("/moves", moves);
app.use(notFoundHandler);

app.listen(3000, () => {
    console.log("Server is running...");
});

//const db = require('./config/database');
// app.get("/test", (req, res) => {
//     db.query("SELECT * FROM pokemon").then((rows)=>{
//         res.status(200);
//         res.send(rows);
//     }).catch((err) => {
//         res.status(500);
//         res.send('Algo salió mal');
//         console.log(err);
//     });
// });