global.rootDir = __dirname ;
global.startDate = null;

const path = require('path') ;
const express = require('express') ;
const cors = require('cors');

const mongo = require('./mongo.js');
console.log(mongo);

const obj = [
    {
        "Philosophers": "Aaron David Gordon",
        "Born": "1856",
        "Birth place": "Ukraine",
        "Died": "1922",
        "Place of Death": "Palestine",
        "Subjects Of Study": "Agriculture, Zionism"
    },
    {
        "Philosophers": "Abraham Joshua Heschel",
        "Born": "1907",
        "Birth place": "Poland",
        "Died": "1972",
        "Place of Death": "York",
        "Subjects Of Study": "Judaism, Philosophy Of Religion"
    },
    {
        "Philosophers": "Albert of Saxony",
        "Born": "1316",
        "Birth place": "Germany",
        "Died": "1390",
        "Place of Death": "Germany",
        "Subjects Of Study": "Gravity"
    },
    {
        "Philosophers": "Alessandro Achillini",
        "Born": "1463",
        "Birth place": "Italy",
        "Died": "1512",
        "Place of Death": "Bologna",
        "Subjects Of Study": "William Of Ockham"
    }
];

async function dostuff(){
    await mongo.erase_all('test');
    await mongo.insert_many(obj, 'test');
    console.log(await mongo.query({ "Philosophers": "Albert of Saxony"}, { }, 'test'));
}

//dostuff();

let app = express();

app.use('/frontoffice/js' , express.static(global.rootDir +'/src/frontoffice'));
app.use('/frontoffice/css' , express.static(global.rootDir +'/src/frontoffice'));

app.use('/js' , express.static(global.rootDir +'/public/js'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/html'));
app.use('/img' , express.static(global.rootDir +'/public/img'));

app.use(express.urlencoded({extended: true}));
app.use(cors());

app.enable('trust proxy');

app.get('/',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'));
});

app.get('/home',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'));
});

app.get('/personal',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'));
});


app.get('/backoffice',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'public/backoffice/index.html'));
    //res.sendFile(path.join(global.rootDir, '/public/index.html'));
});

app.get('/dashboard',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/dashboard/dashboard.html'));
});

app.listen(8000, function() {
    global.startDate = new Date() ;
    console.log(`App listening on port 8000 started ${global.startDate.toLocaleString()}` );
});
