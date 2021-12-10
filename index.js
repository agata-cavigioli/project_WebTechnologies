global.rootDir = __dirname ;
global.startDate = null; 

const path = require('path') ;
const express = require('express') ;
const cors = require("cors");

let app = express(); 


app.use('/backoffice/js' , express.static(global.rootDir +'/src/backoffice'));
app.use('/css' , express.static(global.rootDir +'/public/css'));
app.use('/data', express.static(global.rootDir +'/public/data'));
app.use('/docs', express.static(global.rootDir +'/public/html'));
app.use('/img' , express.static(global.rootDir +'/public/media'));

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.enable('trust proxy');

app.get('/',  function (req, res) { 
	res.sendFile(path.join(global.rootDir, 'src/frontoffice/frontoffice.html'))
});

app.get('/backoffice',  function (req, res) { 
	res.sendFile(path.join(global.rootDir, 'src/backoffice/backoffice.html'))
});

app.get('/dashboard',  function (req, res) { 
	res.sendFile(path.join(global.rootDir, 'src/dashboard/dashboard.html'))
})

app.listen(8000, function() { 
	global.startDate = new Date() ; 
	console.log(`App listening on port 8000 started ${global.startDate.toLocaleString()}` )
})


