//pagina prodotto modifica
//nuovo prodotto
var products = [{
	"name": "Aaron David Gordon",
	"birth": "1856",
	"birth_p": "Ukraine",
	"death": "1922",
	"death_p": "Palestine",
	"subjects": "Agriculture, Zionism",
	"nolo_data": {
		"cost": 100,
		"available_from": "1/1/2345",
		"available_to": "7/3/2736",
		"discount": 0,
		"info": "",
		"condition": "Buono"
	}
}]

var clients = [{
	"name": "Mario",
	"surname": "Rossi",
	"email": "mario.rossi@gmail.com",
	"phone": "3456778254",
	"address": "via vai",
	"nolo_data": {
		"info": ""
	}
}];

var nolos = [{
	"product_id" : 0,
	"client_id" : 0,
	"date_from" : "12/12/2021",
	"date_to" : "1/1/2022",
	"status" : "booked",
	"nolo_data" : {
		"daily_cost" : 123,
		"discount" : 0,
		"other_fees" : 0,
		"info" : ""
	}
}];

$(document).ready(function() {
	fillTable(products, 'inventory');
	/*
	$.ajax({
		url: "/query", // /products/
	}).done(function(res) {
	});
	*/

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
		else if(type == 'nolos') {
			if(y.status == "late")
				$('#nolo').append(`<tr class="problem" onclick="showNolo(${x})">${values}</tr>`);
			else
				$('#nolo').append(`<tr onclick="showNolo(${x})">${values}</tr>`);
		}
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
	$('#product_card_available_from').text(product.nolo_data.available_from);
	$('#product_card_available_to').text(product.nolo_data.available_to);
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

function showNolo(nolo_no){
	var nolo = nolos[nolo_no]; 

	$('#nolo_card_id').text(nolo_no);
	$('#nolo_card_client')
		.text(`${clients[nolo.client_id].name} ${clients[nolo.client_id].surname}`);
	$('#nolo_card_product').text(`${products[nolo.product_id].name}`);
	$('#nolo_card_date')
		.text(`${nolo.date_from} - ${nolo.date_to}`);
	$('#nolo_card_status')
		.text(nolo.status);
	/*
	$('#nolo_card_total')
		.text(nolo.total);
	*/

	$('#nolo_card_info')
		.text(nolo.nolo_data.info != 0 ? nolo.nolo_data.info + '%' : '-');
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

function showHistory() {
	$('#clients_table').css('display', 'none');
	$('#client_history').css('display', '');

	var past_nolos = nolos;
	var current_nolos= nolos;
	var future_nolos= nolos;

	for(let i = 0; i < 5; i++){
	for(n in past_nolos)
		$('#client_history_past').append(createHistoryCard(past_nolos[n]));
	for(n in current_nolos)
		$('#client_history_present').append(createHistoryCard(current_nolos[n]));
	for(n in future_nolos)
		$('#client_history_future').append(createHistoryCard(future_nolos[n]));
	}

}

function createHistoryCard(nolo){

	return `
		<div class="col">
		  <div class="card">
			<div class="card-body">
			  <h3 class="card-title">${products[nolo.product_id].name}</h3>
			  <ul type="none">
				<li>
				  <b>Periodo:</b> da ${nolo.date_from} a ${nolo.date_to}
				</li>
				<li>
				  <b>Stato:</b> ${products[nolo.product_id].nolo_data.condition}
				</li>
				<li>
				  <b>Sconto:</b> 
				</li>
				<li>
				  <b>Costi aggiuntivi:</b> 
				</li>
				<li>
				  <b>Totale:</b> tot
				</li> 
				<li>
				  <b>Info:</b> tot
				</li> 
			  </ul>
			</div>
		  </div>
		</div>`;
}

function modifyProduct(){
	var p_id = $('#product_card_id').text();
	var product = products[p_id];
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

function modifyClient(){
	var c_id = $('#client_card_id').text();
	var client = clients[c_id];
	for(name in client){
		$('#client_card_modify_' + name).val(client[name]);
	}

	$('#client_card').toggle();
	$('#client_card_modify').toggle();
}

function modifyNolo(){
	var n_id = $('#nolo_card_id').text();
	var nolo = nolos[n_id];

	for(name in nolo){
		if(name ==  "nolo_data"){
			for(val in nolo[name]){
				$('#nolo_card_modify_' + val).val(nolo[name][val]);
			}
		} else
			$('#nolo_card_modify_' + name).val(nolo[name]);
	}

	$('#nolo_card_modify_client')
		.val(`${clients[nolo.client_id].name} ${clients[nolo.client_id].surname}`);

	$('#nolo_card_modify_product')
		.val(`${products[nolo.product_id].name}`);

	$('#nolo_card').toggle();
	$('#nolo_card_modify').toggle();
}

function abortModify(type){
	if(type == 'inventory'){
		$('#product_card').toggle();
		$('#product_card_modify').toggle();
	} else if(type == 'clients'){
		$('#client_card').toggle();
		$('#client_card_modify').toggle();
	} else if(type == 'nolos'){
		$('#nolo_card').toggle();
		$('#nolo_card_modify').toggle();
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
		$('#nolos_tab').toggle();
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
	$('#nolos_tab').toggle();
	$('.product_card_options').toggle();
	$('#product_card').css('display', 'none');
	$('#product_card_modify').css('display', 'none');

	updateTab('inventory');
}


function updateTab(_tab){
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

	fillTable(_tab == 'inventory' ? products :
		(_tab == 'clients' ?  clients : nolos), _tab);
}


