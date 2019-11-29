const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const employee = require('./routes/employee');
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
app.use("/employee", employee);
app.use(notFoundHandler);

const PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running...");
});