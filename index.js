global.rootDir = __dirname ;
global.startDate = null;

const path = require('path') ;
const express = require('express') ;
const cors = require('cors');
const url = require('url');
const mongo = require('./mongo.js');

let app = express();

var id_num; 

async function setup(){
    await calculateMaxId();
    //await populateDeps();
}

setup();


async function calculateMaxId(){
    id_num = Math.max(
        findMax(await mongo.query({}, {}, 'products')),
        findMax(await mongo.query({}, {}, 'clients')),
        findMax(await mongo.query({}, {}, 'staff')),
        findMax(await mongo.query({}, {}, 'nolos'))
    );
    console.log(id_num);
}

function findMax(obj){
    let m = -1;
    for(o in obj){
        let val = parseInt(obj[o].id);
        if(val > m) m = val;
    }
    return m;
}

async function populateDeps(){
    let deps = [
        {
            name: 'Marco',
            surname: 'Amerotti',
            dep_id: 7,
            role: 'employee',
            pwd: 'marco',
            email: 'marco@nolo.com'
        },
        {
            name: 'Agata',
            surname: 'Cavigioli',
            dep_id: 4,
            role: 'employee',
            pwd: 'agata',
            email: 'agata@nolo.com'
        },
        {
            name: 'Gorgia',
            surname: 'Messina',
            dep_id: 13,
            role: 'manager',
            pwd: 'gorgia',
            email: 'gorgia@nolo.com'
        }
    ];
    for(d in deps){
        var obj = deps[d];
        obj.id = ++id_num;
        await mongo.insert_one(obj, 'staff');
    }
}



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




app.post('/update/products',  async function (req, res) {
    var obj = await req.body;

    obj.$set.birth = parseInt(obj.$set.birth);
    obj.$set.death = parseInt(obj.$set.death);
    obj.$set.nolo_data.discount = parseInt(obj.$set.nolo_data.discount);
    obj.$set.nolo_data.cost = parseInt(obj.$set.nolo_data.cost);

    res.send(await
        mongo.update(createMongoQuery(req), obj, 'products'));
});

app.post('/update/clients',  async function (req, res) {
    var obj = await req.body;
    res.send(await
        mongo.update(createMongoQuery(req), obj, 'clients'));
});

app.post('/update/nolos',  async function (req, res) {
    var obj = await req.body;

    obj.$set.client_id = parseInt(obj.$set.client_id);
    obj.$set.product_id = parseInt(obj.$set.product_id);
    obj.$set.dep_id = parseInt(obj.$set.dep_id);
    obj.$set.nolo_data.daily_cost = parseInt(obj.$set.nolo_data.daily_cost);
    obj.$set.nolo_data.discount = parseInt(obj.$set.nolo_data.discount);
    obj.$set.nolo_data.other_fees = parseInt(obj.$set.nolo_data.other_fees);
    console.log(obj);

    res.send(await
        mongo.update(createMongoQuery(req), obj, 'nolos'));
});


app.delete('/products',  async function (req, res) {
    res.send(await
        mongo.delete(createMongoQuery(req), 'products'));
});

app.delete('/clients',  async function (req, res) {
    res.send(await
        mongo.delete(createMongoQuery(req), 'clients'));
});

app.delete('/nolos',  async function (req, res) {
    res.send(await
        mongo.delete(createMongoQuery(req), 'nolos'));
});



app.post('/products', async function (req, res){
    var obj = await req.body;
    obj.id = ++id_num;
    obj.birth = parseInt(obj.birth);
    obj.death = parseInt(obj.death);
    obj.nolo_data.discount = parseInt(obj.nolo_data.discount);
    obj.nolo_data.cost = parseInt(obj.nolo_data.cost);
    mongo.insert_one(obj, 'products');
    res.send(obj);
});

app.post('/clients', async function (req, res){
    var obj = await req.body;
    req.body.id = ++id_num;
    mongo.insert_one(req.body, 'clients');
    res.send(obj);
});

app.post('/nolos', async function (req, res){
    var obj = await req.body;
    req.body.id = ++id_num;
    obj.client_id = parseInt(obj.client_id);
    obj.product_id = parseInt(obj.product_id);
    obj.dep_id = parseInt(obj.dep_id);
    obj.nolo_data.daily_cost = parseInt(obj.nolo_data.daily_cost);
    obj.nolo_data.discount = parseInt(obj.nolo_data.discount);
    obj.nolo_data.other_fees = parseInt(obj.nolo_data.other_fees);
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
