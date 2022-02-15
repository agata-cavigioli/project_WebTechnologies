//pagina prodotto modifica
//nuovo prodotto
// $.post('http://site202123.tw.cs.unibo.it/products', products[0]);

var logged_id = 0;
var logged = false;

var products;
var clients;

var prods = [
	{"name": "Aaron David Gordon", "birth": 1856, "birth_p": "Ukraine", "death": 1922, "death_p": "Palestine", "subjects": "Agriculture, Zionism", "nolo_data": 
		{"cost": 134, "available_from": "", "available_to": "", "discount": 0, "condition": "Entusiasta", "info": ""}}]; 

var clt = [{"name":"agata","surname":"cavigioli","email":"agata.cav@gmail.com","pwd":"agata","phone":"333","address":"via via","nolo_data":{"info":""}},{"name":"maria","surname":"mari","email":"maria.maria@gmail.com","pwd":"maria","phone":"466","address":"via mari","nolo_data":{"info":""}},{"name":"Luca","surname":"Rossi","email":"luca.rossi@gmail.com","pwd":"luca","phone":"222","address":"via rossa","nolo_data":{"info":""}},{"name":"giulio","surname":"neri","email":"giulio.neri@gmail.com","pwd":"giulio","phone":"234","address":"via scura","nolo_data":{"info":""}},{"name":"lucia","surname":"verdi","email":"lucia.verdi@gmail.com","pwd":"lucia","phone":"224","address":"via verde","nolo_data":{"info":""}},{"name":"giulia","surname":"rini","email":"giulia.rini@gmail.it","pwd":"giulia","phone":"222","address":"via del cio","nolo_data":{"info":""}},{"name":"mia","surname":"mai","email":"miamai@gmail.com","pwd":"miamia","phone":"4567890","address":"piazza po","nolo_data":{"info":""}}];

var nols = [{
	"product_id" : 2,
	"client_id" : 3,
	"date_from" : "12/12/2021",
	"date_to" : "1/1/2022",
	"status" : "booked",
	"dep_id" : 3,
	"nolo_data" : {
		"daily_cost" : 123,
		"discount" : 0,
		"other_fees" : 0,
		"info" : ""
	}
}];

async function populateProds(){
	for(p in prods){
		console.log(prods[p]);
		await $.post('http://site202123.tw.cs.unibo.it/products', prods[p]);
	}
}

async function populateNolos(){
	for(n in nols){
		console.log(nols[n]);
		await $.post('http://site202123.tw.cs.unibo.it/nolos', nols[n]);
	}
}

async function populateClients(){
	for(c in clt){
		console.log(clt[c]);
		await $.post('http://site202123.tw.cs.unibo.it/clients', clt[c]);
	}
}

function calculateDays(date_from, date_to){
	const date1 = new Date(date_from);
	const date2 = new Date(date_to);
	const diffTime = date2 - date1;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
	return diffDays;
}

function calculateTotal(nolo){
	var days = calculateDays(nolo.date_from, nolo.date_to);
	const perc = (1 - parseInt(nolo.nolo_data.discount)/100);
	const base_cost = days * parseInt(nolo.nolo_data.daily_cost);
	const total = (base_cost * perc) + parseInt(nolo.nolo_data.other_fees);
	return Math.round(total*100)/100;
}

function checkAvailability(product_id, date_from, date_to){
}

$(document).ready(async function() {

	products = await getAllProducts();
	fillTable(products, 'inventory');

});

async function getAllProducts(){
	let tmp;
	await $.get('http://site202123.tw.cs.unibo.it/products', function(data){
		tmp = data;
	});
	return tmp;
}

async function getAllClients(){
	let tmp;
	await $.get('http://site202123.tw.cs.unibo.it/clients', function(data){
		tmp = data;
	});
	return tmp;
}

async function getAllNolos(){
	let tmp;
	await $.get('http://site202123.tw.cs.unibo.it/nolos', function(data){
		tmp = data;
	});
	return tmp;
}

async function fillTable(list, type){

	for(x in list){
		let values = '';
		let y = list[x];

		var keys = [];
		if(type == 'clients') keys = ['name', 'surname', 'email', 'phone', 'address'];		
		else if(type == 'inventory') keys = ['birth', 'birth_p', 'death', 'death_p', 'name', 'subjects'];		
		else keys = ['client_id', 'date_from', 'date_to', 'dep_id', 'product_id', 'status'];		

		for(i in keys){
			name = keys[i];
			if(name == "nolo_data" | name == "_id" | name == "id") continue;
			if(name == "client_id"){
				var client = await $.get(`http://site202123.tw.cs.unibo.it/clients?id=${y[name]}`);
				client = client[0];
				val = client ? `${client?.name} ${client?.surname}`: y[name];
				values += `<td>${val}</td>`;
			} else if (name == "product_id") {
				var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${y[name]}`);
				product = product[0];
				val = product ? product.name : y[name];
				values += `<td>${val}</td>`;
			}
			else {
				values += `<td>${y[name]}</td>`;
			}
		}

		if(type == 'inventory')
			$('#products').append(`<tr onclick="showProduct(${y.id})">${values}</tr>`);
		else if(type == 'clients')
			$('#people').append(`<tr onclick="showClient(${y.id})">${values}</tr>`);
		else if(type == 'nolos') {
			if(y.status == "late")
				$('#nolo').append(`<tr class="problem" onclick="showNolo(${y.id})">${values}</tr>`);
			else
				$('#nolo').append(`<tr onclick="showNolo(${y.id})">${values}</tr>`);
		}
	}
}

function insertProduct(){
	$('#product_card').css('display', 'none');	
	$('#product_card_modify').css('display', 'none');	
	$('#product_card_insert').css('display', '');	
}

async function saveNewProduct(){
	var values = {};
	$('#product_card_insert :input').each(function() {
		values[this.name] = $(this).val();
	});

	var obj = {nolo_data: {}};
	var nolo_data_f = ["cost", "available_from", "available_to", "discount", "condition", "info"];

	for(v in values){
		if(nolo_data_f.includes(v)){
			obj.nolo_data[v] = values[v];
		} else obj[v] = values[v];
	}

	await $.post("http://site202123.tw.cs.unibo.it/products", obj)
		.done(function(res){
			console.log(res);
		});

	$('#product_card').css('display', 'none');	
	$('#product_card_modify').css('display', 'none');	
	$('#product_card_insert').css('display', 'none');	

}

function insertNolo(){
	$('#nolo_card').css('display', 'none');	
	$('#nolo_card_modify').css('display', 'none');	
	$('#nolo_card_insert').css('display', '');	
}

async function saveNewNolo(){
	var values = {};
	$('#nolo_card_insert :input').each(function() {
		values[this.name] = $(this).val();
	});

	var obj = {nolo_data: {}};
	var nolo_data_f = ["daily_cost", "discount", "other_fees", "info"];

	for(v in values){
		if(nolo_data_f.includes(v)){
			obj.nolo_data[v] = values[v];
		} else obj[v] = values[v];
	}

	obj.dep_id = logged_id;

	await $.post("http://site202123.tw.cs.unibo.it/nolos", obj)
		.done(function(res){
			console.log(res);
		});

	$('#nolo_card').css('display', 'none');	
	$('#nolo_card_modify').css('display', 'none');	
	$('#nolo_card_insert').css('display', 'none');	

}

function insertClient(){
	$('#client_card').css('display', 'none');	
	$('#client_card_modify').css('display', 'none');	
	$('#client_card_insert').css('display', '');	
}

async function saveNewClient(){
	var values = {};
	$('#client_card_insert :input').each(function() {
		values[this.name] = $(this).val();
	});

	var obj = {nolo_data: {}};
	var client_data_f = ["info"];

	for(v in values){
		if(client_data_f.includes(v)){
			obj.nolo_data[v] = values[v];
		} else obj[v] = values[v];
	}

	await $.post("http://site202123.tw.cs.unibo.it/clients", obj)
		.done(function(res){
			console.log(res);
		});

	$('#client_card').css('display', 'none');	
	$('#client_card_modify').css('display', 'none');	
	$('#client_card_insert').css('display', 'none');	

}

function eraseTables(){
	$('#products').html('');
	$('#people').html('');
	$('#nolo').html('');
}

async function showProduct(prod_no){

	var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${prod_no}`);
	product = product[0];

	$('#product_card_name').text(product.name);
	$('#product_card_id').text(prod_no);
	$('#product_card_age').text(`
		${product.birth}, ${product.birth_p} - 
		${product.death}, ${product.death_p}
	`);
	$('#product_card_subject').text(product.subjects);

	$('#product_card_price').text(product.nolo_data.cost);

	if(product.nolo_data.available_from == "" &&
		product.nolo_data.available_from == ""){
		$('#product_card_available_dates').css('display', 'none');
		$('#product_card_available_abs').css('display', '');
		$('#product_card_available').text('Sì');
	} else {
		$('#product_card_available_abs').css('display', 'none');
		$('#product_card_available_dates').css('display', '');
		$('#product_card_available_from').text(product.nolo_data.available_from);
		$('#product_card_available_to').text(product.nolo_data.available_to);
	}

	$('#product_card_info').text(product.nolo_data.info != 0 ? product.nolo_data.info : '-');
	$('#product_card_discount').text(product.nolo_data.discount != 0 ? product.nolo_data.discount + '%' : '-');
	$('#product_card_condition').text(product.nolo_data.condition);


	$('#product_card_modify').css('display', 'none');
	$('#product_card').css('display', '');

	window.location.href='#product_card';
}

async function showClient(client_no){
	var client = await $.get(`http://site202123.tw.cs.unibo.it/clients?id=${client_no}`);
	client = client[0];

	$('#client_card_name').text(`${client.name} ${client.surname}`);
	$('#client_card_id').text(client_no);
	$('#client_card_email').text(client.email);
	$('#client_card_phone').text(client.phone);
	$('#client_card_address').text(client.address);
	$('#client_card_info').text(client.nolo_data.info != 0 ? client.nolo_data.info : '-');


	$('#client_card_modify').css('display', 'none');
	$('#client_card').css('display', '');

	window.location.href='#client_card';
}

async function showNolo(nolo_no){
	var nolo = await $.get(`http://site202123.tw.cs.unibo.it/nolos?id=${nolo_no}`);
	nolo = nolo[0];

	var client = await $.get(`http://site202123.tw.cs.unibo.it/clients?id=${nolo.client_id}`);
	client = client[0];

	var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${nolo.product_id}`);
	product = product[0];

	$('#nolo_card_id').text(nolo_no);

	if(client) $('#nolo_card_client').text(`${client.name} ${client.surname}`);
	else $('#nolo_card_client').text(`Cliente non in elenco.`);

	if(product) $('#nolo_card_product').text(`${product.name}`);
	else $('#nolo_card_product').text(`Prodotto non in elenco.`);

	$('#nolo_card_date')
		.text(`${nolo.date_from} - ${nolo.date_to}`);
	$('#nolo_card_status')
		.text(nolo.status);

	$('#nolo_card_total')
		.text(calculateTotal(nolo));

	$('#nolo_card_days').text(calculateDays(nolo.date_from, nolo.date_to));

	$('#nolo_card_info')
		.text(nolo.nolo_data.info != 0 ? nolo.nolo_data.info : '-');
	$('#nolo_card_other_fees')
		.text(nolo.nolo_data.other_fees!= 0 ? nolo.nolo_data.other_fees : '-');
	$('#nolo_card_daily_cost')
		.text(nolo.nolo_data.daily_cost!= 0 ? nolo.nolo_data.daily_cost: '-');
	$('#nolo_card_discount')
		.text(nolo.nolo_data.discount!= 0 ? nolo.nolo_data.discount: '-');


	$('#nolo_card_modify').css('display', 'none');
	$('#nolo_card').css('display', '');

	window.location.href='#nolo_card';
}

async function showHistory() {
	$('#clients_table').css('display', 'none');
	$('#client_history').css('display', '');

	var c_id = $('#client_card_id').text();
	var client_nols = await $.get(`http://site202123.tw.cs.unibo.it/nolos?client_id="${c_id}"`);

	var past_nolos = [];
	var current_nolos = [];
	var future_nolos = [];

	const today = new Date();

	console.log(today);
	for(n in client_nols){
		var nolo = client_nols[n];
		var sdate = new Date(nolo.date_from);
		var edate = new Date(nolo.date_to);

		if(today >= sdate && today <= edate) current_nolos.push(nolo);
		else if(sdate > today) future_nolos.push(nolo);
		else if(edate < today) past_nolos.push(nolo);

	}

	for(n in past_nolos)
		$('#client_history_past')
			.append(await createHistoryCard(past_nolos[n]));
	for(n in current_nolos)
		$('#client_history_present')
			.append(await createHistoryCard(current_nolos[n]));
	for(n in future_nolos)
		$('#client_history_future')
			.append(await createHistoryCard(future_nolos[n]));

}

function hideHistory() {
	$('#clients_table').css('display', '');
	$('#client_history').css('display', 'none');

	$('#client_history_past').html('');
	$('#client_history_present').html('');
	$('#client_history_future').html('');
}


async function createHistoryCard(nolo){

	var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${nolo.product_id}`);
	product = product[0];

	var tot = calculateTotal(nolo);

	if(!product) return '';

	return `
		<div class="col">
		  <div class="card">
			<div class="card-body">
			  <h3 class="card-title">${product.name}</h3>
			  <ul type="none">
				<li>
				  <b>Periodo:</b> da ${nolo.date_from} a ${nolo.date_to}
				</li>
				<li>
				  <b>Stato:</b> ${nolo.status}
				</li>
				<li>
				  <b>Sconto:</b> ${nolo.nolo_data.discount} 
				</li>
				<li>
				  <b>Costi aggiuntivi:</b> ${nolo.nolo_data.other_fees}
				</li>
				<li>
				  <b>Totale:</b> ${tot}
				</li> 
				<li>
				  <b>Info:</b> ${nolo.nolo_data.info}
				</li> 
			  </ul>
			</div>
		  </div>
		</div>`;
}

async function modifyProduct(){
	var p_id = $('#product_card_id').text();

	var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${p_id}`);
	product = product[0];

	for(name in product){
		if(name ==  "nolo_data"){
			for(val in product[name]){
				$('#product_card_modify_' + val).val(product[name][val]);
			}
		} else
			$('#product_card_modify_' + name).val(product[name]);
	}

	$('#product_card').toggle();
	$('#product_card_modify').toggle();
}

async function modifyClient(){
	var c_id = $('#client_card_id').text();
	var client = await $.get(`http://site202123.tw.cs.unibo.it/clients?id=${c_id}`);
	client = client[0];

	for(name in client){
		$('#client_card_modify_' + name).val(client[name]);
	}

	$('#client_card').toggle();
	$('#client_card_modify').toggle();
}

async function modifyNolo(){
	var n_id = $('#nolo_card_id').text();
	var nolo = await $.get(`http://site202123.tw.cs.unibo.it/nolos?id=${n_id}`);
	nolo = nolo[0];

	for(name in nolo){
		if(name ==  "nolo_data"){
			for(val in nolo[name]){
				$('#nolo_card_modify_' + val).val(nolo[name][val]);
			}
		} else
			$('#nolo_card_modify_' + name).val(nolo[name]);
	}

	$('#nolo_card_modify_client')
		.val(`${nolo.client_id}`);

	$('#nolo_card_modify_product')
		.val(`${nolo.product_id}`);

	$('#nolo_card').toggle();
	$('#nolo_card_modify').toggle();
}

function abortModify(type){
	if(type == 'inventory'){
		$('#product_card').toggle();
		$('#product_card_modify').css('display', 'none');
		$('#product_card_insert').css('display', 'none');
	} else if(type == 'clients'){
		$('#client_card').toggle();
		$('#client_card_modify').css('display', 'none');
		$('#client_card_insert').css('display', 'none');
	} else if(type == 'nolos'){
		$('#nolo_card').toggle();
		$('#nolo_card_modify').css('display', 'none');
		$('#nolo_card_insert').css('display', 'none');
	}
}

function noloProduct(){
	var text = $('#nolo_button').text();
	$('#nolo_button').text(text == 'Preventivo' ? 'Annulla' : 'Preventivo');

	$('#product_card_info_list').toggle();
	$('#product_card_nolo_list').toggle();
	$('#nolo_calc_button').toggle();
	$('#nolo_form_base_price').text(
		$('#product_card_price').text()
	);
}

async function doNolo(){
	var p_id = $('#product_card_id').text();

	var product = await $.get(`http://site202123.tw.cs.unibo.it/products?id=${p_id}`);
	product = product[0];

	var values = {};
	$('#nolo_form :input').each(function() {
		values[this.name] = $(this).val();
	});

	var days = calculateDays(values.date_from, values.date_to);
	if(days <= 0){
		$('#nolo_form_invalid_dates').css('display', '');
		return;
	} else $('#nolo_form_invalid_dates').css('display', 'none');

	const perc = (1 - parseInt(values.discount)/100);
	const base_cost = days * parseInt(product.nolo_data.cost);
	const total = (base_cost * perc) + parseInt(values.other_fees);


	$('#nolo_form_days').text(days);
	$('#nolo_form_total').text('');
	$('#nolo_form_total').text(Math.round(total * 100)/100);

}

function doLogin(){
	$('#header_buttons').toggle();
	$('#the_office').toggle();
	$('#login_window').toggle();
}

function checkCredentials(){

	// get input vals
	var values = {};
	$('#login_form :input').each(function() {
		values[this.name] = $(this).val();
	});

	console.log(values);

	// check login
	if(values.email != values.password){
		$('#incorrect_email_message').css('display', '');
	} else {

		//change login to logout
		$('#header_buttons').html(
			`<button onclick="logout()"
		type="button"
		class="btn btn-primary w-100">
		  Logout
		</button>`);

		// toggle things
		$('#incorrect_email_message').css('display', 'none');
		$('#the_office').toggle();
		$('#login_window').toggle();
		$('#clients_tab').toggle();
		$('#nolos_tab').toggle();
		$('.product_card_options').toggle();
		$('#header_buttons').toggle();
		$('#product_insert_button').toggle();

		//reset fields
		$('#login_form :input').val('');

		logged = true;
	}
}

async function logout(){
	$('#header_buttons')
		.html('<button onclick="doLogin()" type="button" class="btn btn-primary w-100">Login</button>');
	$('#clients_tab').toggle();
	$('#nolos_tab').toggle();
	$('.product_card_options').toggle();
	$('#product_card').css('display', 'none');
	$('#product_card_modify').css('display', 'none');

	await updateTab('inventory');

	logged = false;
}


async function updateTab(_tab){
	let alltabs = $('.top-tabs');
	alltabs.removeClass('active');
	alltabs.attr('aria-current', 'page');
	alltabs.css('background', '#eeeeee');

	let allcontent = $('.content-tab');
	allcontent.css('display', 'none');

	eraseTables();

	let tab = $('#'+_tab + '_tab');
	tab.addClass('active');
	tab.attr('aria-current', 'true');
	tab.css('background', '#ffffff');

	let content = $('#'+_tab);
	content.css('display', '');

	let array;
	if(_tab == 'inventory') {
		products = await getAllProducts();
		array = products;
	} else if (_tab == 'clients') {
		clients = await getAllClients();
		array = clients;
	} else {
		nolos = await getAllNolos();
		array = nolos;
	}

	fillTable(array, _tab);
}


