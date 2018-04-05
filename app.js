const express = require('express');
const app = express();
const path = require('path');

//const router = express.Router();

app.use(express.static('public'));
//router.route('/:params*')
    //.get((req, res) => {
  //  res.sendFile(path.resolve(`public/${req.path}`));
//});

//app.use('/public', router);

app.get('/',(req, res, next) => res.sendFile(path.resolve('./public/UI/index.html')));

const server = app.listen(3000, console.log("Server is running..."));

//app.use((req, res) => {
  //  res.sendFile(path.resolve('./public/UI/errorPage.html'));
//});