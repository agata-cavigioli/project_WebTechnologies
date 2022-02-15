global.rootDir = __dirname ;
global.startDate = null;


const path = require('path') ;
const express = require('express') ;
const cors = require('cors');
const url = require('url');
const mongo = require('./mongo.js');


let app = express();

var id_num = Math.max(
        findMax(mongo.query({}, {}, 'products')),
        findMax(mongo.query({}, {}, 'clients')),
        findMax(mongo.query({}, {}, 'staff')),
        findMax(mongo.query({}, {}, 'nolos'))
    );

function findMax(obj){
    var m = -1;
    for(o in obj){
        if(o.id > m) m = o.id;
    }
    return m;
}

console.log(id_num);


app.use('/frontoffice/js' , express.static(global.rootDir +'/src/frontoffice'));
app.use('/frontoffice/css' , express.static(global.rootDir +'/src/frontoffice'));


app.use('/backoffice/js' , express.static(global.rootDir +'/src/backoffice'));
app.use('/backoffice/css' , express.static(global.rootDir +'/src/backoffice'));
app.use('/backoffice/img' , express.static(global.rootDir +'/src/backoffice'));

app.use('/dashboard/js' , express.static(global.rootDir +'/src/dashboard'));


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




/********************************* API ***************************************/

function createMongoQuery(req){
    var url_query = {};
    try {
        url_query = url.parse(req.url, true).query;
    } catch(x) {console.log(x)} 
    var query = {};
    for(q in url_query){
        try {
            query[q] = JSON.parse(url_query[q]);
        } catch(x){
            query[q] = url_query[q];
        };
    }
    console.log(query);
    return query;
}

app.get('/products',  async function (req, res) {
    res.send(await
        mongo.query(createMongoQuery(req), {}, 'products'));
});

app.get('/clients',  async function (req, res) {
    res.send(await
        mongo.query(createMongoQuery(req), {}, 'clients'));
});

app.get('/nolos',  async function (req, res) {
    res.send(await
        mongo.query(createMongoQuery(req), {}, 'nolos'));
});

app.get('/staff',  async function (req, res) {
    res.send(await
        mongo.query(createMongoQuery(req), {}, 'staff'));
});


app.post('/products', async function (req, res){
    console.log('req');
    var obj = await req.body;
    obj.id = ++id_num;
    console.log(obj)
    mongo.insert_one(obj, 'products');
    res.send(obj);
});

app.post('/clients', function (req, res){
    var obj = req.body;
    req.body.id = ++id_num;
    mongo.insert_one(req.body, 'clients');
    res.send(obj);
});

app.post('/nolos', function (req, res){
    var obj = req.body;
    req.body.id = ++id_num;
    mongo.insert_one(req.body, 'nolos');
    res.send(obj);
});

app.get('/erase', function(req, res){
    const url_query = url.parse(req.url, true).query;
    res.send(url_query);
    mongo.erase_all(url_query.collection);
});


/**************************************************************************************/


app.get('/home',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'));
});

app.get('/personal',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'));
});

app.get('/backoffice',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/backoffice/backoffice.html'));
});

app.get('/dashboard',  function (req, res) {
    res.sendFile(path.join(global.rootDir, 'src/dashboard/dashboard.html'));
});

app.listen(8000, function() {
    global.startDate = new Date() ;
    console.log(`App listening on port 8000 started ${global.startDate.toLocaleString()}` );
});
