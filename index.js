global.rootDir = __dirname ;
global.startDate = null; 

const path = require('path') ;
const express = require('express') ;

let app = express(); 

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


