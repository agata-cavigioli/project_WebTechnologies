var products = [ { "name": "Aaron David Gordon", "birth": "1856", "birth_p": "Ukraine", "death": "1922", "death_p": "Palestine", "subjects": "Agriculture, Zionism", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Abraham Joshua Heschel", "birth": "1907", "birth_p": "Poland", "death": "1972", "death_p": "York", "subjects": "Judaism, Philosophy Of Religion", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Albert of Saxony", "birth": "1316", "birth_p": "Germany", "death": "1390", "death_p": "Germany", "subjects": "Gravity", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Alessandro Achillini", "birth": "1463", "birth_p": "Italy", "death": "1512", "death_p": "Bologna", "subjects": "William Of Ockham", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Alexander Gottlieb Baumgarten", "birth": "1714", "birth_p": "Germany", "death": "1762", "death_p": "Germany", "subjects": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Alexius Meinong", "birth": "1853", "birth_p": "Ukraine", "death": "1920", "death_p": "Austria", "subjects": "Objectivism, Intentionality", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Alfred Firmin Loisy", "birth": "1857", "birth_p": "France", "death": "1940", "death_p": "France", "subjects": "Philosophy Of Religion, Modernism", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }, { "name": "Alfred Korzybski", "birth": "1879", "birth_p": "Poland", "death": "1950", "death_p": "Connecticut", "subjects": "Semantics, General Semantics", "nolo_data": { "cost": 100, "available": true, "discount": 0, "info": "", "condition": "Buono" } }];

var clients = [
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
	{
		"name": "Mario",
		"surname": "Rossi",
		"email": "mario.rossi@gmail.com",
		"phone": "3456778254",
		"address": "via vai",
		"nolo_data": {
			"info": ""
		}
	},
];

$( document ).ready(function() {

	fillTable(products, 'inventory');

});

function fillTable(list, type){

	for(x in list){
		let values = '';
		let y = list[x];
		for(name in y){
			if(name == "nolo_data") continue;
			values += `<td>${y[name]}</td>`;
		}

		if(type == 'inventory')
			$('#products').append(`<tr onclick="showProduct(${x})">${values}</tr>`);
		else if(type == 'clients')
			$('#people').append(`<tr onclick="showClient(${x})">${values}</tr>`);
		else if(type == 'nolo')
			$('#nolo').append(`<tr onclick="showNolo(${x})">${values}</tr>`);
	}
}

function eraseTables(){
	$('#products').html('');
	$('#people').html('');
	$('#nolo').html('');
}

function showProduct(prod_no){
	var product = products[prod_no]; 

	$('#product_card_name').text(product.name);
	$('#product_card_id').text(prod_no);
	$('#product_card_age').text(`
		${product.birth}, ${product.birth_p} - 
		${product.death}, ${product.death_p}
	 `);
	$('#product_card_subject').text(product.subjects);

	$('#product_card_price').text(product.nolo_data.cost);
	$('#product_card_avail').text(product.nolo_data.available ? 'Sì' : 'No');
	$('#product_card_info').text(product.nolo_data.info != 0 ? product.nolo_data.info + '%' : '-');
	$('#product_card_discount').text(product.nolo_data.discount != 0 ? product.nolo_data.discount + '%' : '-');
	$('#product_card_condition').text(product.nolo_data.condition);


	$('#product_card_modify').css('display', 'none');
	$('#product_card').css('display', '');

	window.location.href='#product_card';
}

function showClient(client_no){
	var client = clients[client_no]; 

	$('#client_card_name').text(`${client.name} ${client.surname}`);
	$('#client_card_id').text(client_no);
	$('#client_card_email').text(client.email);
	$('#client_card_phone').text(client.phone);
	$('#client_card_address').text(client.address);
	$('#client_card_info').text(client.nolo_data.info != 0 ? client.nolo_data.info + '%' : '-');


	$('#client_card_modify').css('display', 'none');
	$('#client_card').css('display', '');

	window.location.href='#client_card';
}

function modifyProduct(){
	var p_id = $('#product_card_id').text();
	var product = products[p_id];
	for(name in product){
		$('#product_card_modify_' + name).val(product[name]);
		if(name ==  "nolo_data"){
			for(val in product[name]){
				$('#product_card_modify_' + val).val(product[name][val]);
			}
		}
	}

	$('#product_card').toggle();
	$('#product_card_modify').toggle();
}

function modifyClient(){
	var c_id = $('#client_card_id').text();
	var client = clients[c_id];
	for(name in client){
		$('#client_card_modify_' + name).val(client[name]);
	}

	$('#client_card').toggle();
	$('#client_card_modify').toggle();
}

function abortModify(type){
	if(type == 'inventory'){
	$('#product_card').toggle();
	$('#product_card_modify').toggle();
	} else if(type == 'clients'){
	$('#client_card').toggle();
	$('#client_card_modify').toggle();
	}
}

function noloProduct(){
	var text = $('#nolo_button').text();
	$('#nolo_button').text(text == 'Preventivo' ? 'Annulla' : 'Preventivo');

	$('#product_card_info_list').toggle();
	$('#product_card_nolo_list').toggle();
	$('#nolo_calc_button').toggle();
}

function doNolo(){
	var p_id = $('#product_card_id').text();
	var product = products[p_id];

	var values = {};
	$('#nolo_form :input').each(function() {
		values[this.name] = $(this).val();
	});

	console.log(values);

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
		$('.product_card_options').toggle();
		$('#header_buttons').toggle();

		//reset fields
		$('#login_form :input').val('');
	}
}

function logout(){
	$('#header_buttons')
		.html('<button onclick="doLogin()" type="button" class="btn btn-primary w-100">Login</button>');
	$('#clients_tab').toggle();
	$('.product_card_options').toggle();
	$('#product_card').css('display', 'none');
	$('#product_card_modify').css('display', 'none');

	updateTab('inventory');
}


function updateTab(_tab){
	let alltabs = $('.top-tabs');
	alltabs.removeClass('active');
	alltabs.attr('aria-current', 'page');

	let allcontent = $('.content-tab');
	allcontent.css('display', 'none');

	eraseTables();

	let tab = $('#'+_tab + '_tab');
	tab.addClass('active');
	tab.attr('aria-current', 'true');

	let content = $('#'+_tab);
	content.css('display', '');

	fillTable(_tab == 'inventory' ? products : clients, _tab);
}


