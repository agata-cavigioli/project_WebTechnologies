var logged_id = 0;
var logged = false;
var logged_user;

var products;
var clients;

function calculateDays(date_from, date_to){
	const date1 = new Date(date_from);
	const date2 = new Date(date_to);
	const diffTime = date2 - date1;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
	return diffDays;
}

function calculateTotal(nolo){
	var days = calculateDays(nolo.date_from, nolo.date_to);
	const perc = (1 - parseFloat(nolo.nolo_data.discount)/100);
	const base_cost = days * parseFloat(nolo.nolo_data.daily_cost);
	const total = (base_cost * perc) + parseFloat(nolo.nolo_data.other_fees);
	return Math.round(total*100)/100;
}

async function checkAvailability(nolo_id, product_id, from, to){
	var prod_nolos = await $.get(`//site202123.tw.cs.unibo.it/nolos?product_id=${product_id}`);

	var date_from = new Date(from);
	var date_to = new Date(to);

	for(n in prod_nolos){
		let nol = prod_nolos[n];

		if(nol.id == nolo_id) continue;

		let sdate = new Date(nol.date_from);
		let edate = new Date(nol.date_to);

		if((date_from >= sdate && date_from <= edate) ||
			(date_to >= sdate && date_to <= edate)){
			console.log('bingo');
			return false;
		}
		if((sdate > date_from && sdate < date_to) ||
			(edate> date_from && edate < date_to)){
			console.log('bingo');
			return false;
		}
	}

	return true;
}

$(document).ready(async function() {
	products = await getAll('products');
	fillTable(products, 'inventory');
});

async function getAll(type){
	let tmp;
	await $.get('//site202123.tw.cs.unibo.it/'+type , function(data){
		tmp = data;
	});
	return tmp;
}

async function getById(collection, id){
	var elem = await $.get(`//site202123.tw.cs.unibo.it/${collection}?id=${id}`);
	elem = elem[0];
	return elem;
}

async function fillTable(list, type){
	var html_elem;

	if(type == 'inventory'){
		html_elem = $('#products');
	} else if(type == 'clients'){
		html_elem = $('#people');
	} else if(type == 'nolos') {
		html_elem = $('#nolo');
	}

	html_elem.css('display', '');
	$('.no-results-message').css('display', 'none');

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

				var client = await getById('clients', y[name]);

				val = client ? `${client?.name} ${client?.surname}`: y[name];
				values += `<td>${val}</td>`;

			} else if (name == "product_id") {

				var product = await getById('products', y[name]);

				val = product ? product.name : y[name];
				values += `<td>${val}</td>`;
			} else if (name == "dep_id") {

				if(y[name] == -1) val = 'Web';
				else {
					var dep = await getById('staff', y[name]);
					val = dep ? dep.name + ' ' + dep.surname : y[name];
				}

				values += `<td>${val}</td>`;
			}
			else {
				values += `<td>${y[name]}</td>`;
			}
		}

		var showFunction;
		if(type == 'inventory'){
			showFunction = `showProduct(${y.id})`;
		} else if(type == 'clients'){
			showFunction = `showClient(${y.id})`;
		} else if(type == 'nolos') {
			showFunction = `showNolo(${y.id})`;
		}

		html_elem.append(`<tr tabindex=0 onclick="${showFunction}">
							${values}
							<td style="text-align: center;">
								<button class="btn" aria-label="Visualizza" onclick="${showFunction}">
								>
								</button>
							</td>
						</tr>`);
	}

	if (list.length == 0){
		html_elem.css('display', 'none')
			.before('<h2 class="p-3 tabindex=0 text-center no-results-message">Nessun risultato</h2>');
	}
}

function getElemInputs(div){
	var values = {};
	$(div + ' :input').each(function() {
		values[this.name] = $(this).val();
	});
	return values;
}

function resetSearchInputs(div){
	$(div + ' :input').each(function() {
		$(this).val('');
	});

	$('.no-results-message').css('display', 'none');

	var type = div == '#product_header' ? 'inventory' : 
		(div == '#clients_header' ? 'clients' : 'nolos');
	console.log(type);
	updateTab(type);
}

function insertElem(div_prefix){
	$(`#${div_prefix}_card_insert :input`).each(function() {
		$(this).val('');
	});
	$(`#${div_prefix}_card`).css('display', 'none');	
	$(`#${div_prefix}_card_modify`).css('display', 'none');	
	$(`#${div_prefix}_card_insert`).css('display', '');	
}

function makeDbRecord(type, values){
	var fields = [];
	var obj = {nolo_data: {}};

	if(type == 'product') fields = ["cost", "available_from", "available_to", "discount", "condition", "info"];
	else if(type == 'client') fields = ["info"];
	else if(type == 'nolo') fields = ["daily_cost", "discount", "other_fees", "info"];

	for(v in values){
		if(fields.includes(v)){
			obj.nolo_data[v] = values[v];
		} else obj[v] = values[v];
	}

	return obj;
}

async function postElem(collection, obj){
	await $.post(`//site202123.tw.cs.unibo.it/${collection}`, obj)
		.done(function(res){
			console.log(res);
		});
}

function hideCards(div_prefix){
	$(`#${div_prefix}_card`).css('display', 'none');	
	$(`#${div_prefix}_card_modify`).css('display', 'none');	
	$(`#${div_prefix}_card_insert`).css('display', 'none');	
}

function insertProduct(){
	insertElem('product');
}

function insertClient(){
	insertElem('client');
}

function insertNolo(){
	insertElem('nolo');
}

async function saveNewProduct(){
	var values = getElemInputs('#product_card_insert');

	var obj = makeDbRecord('product', values);

	postElem('products', obj);
	hideCards('product');
}

async function saveNewNolo(){
	var values = getElemInputs('#nolo_card_insert');

	var days = calculateDays(values.date_from, values.date_to);

	if(days <= 0){
		$('#nolo_card_insert_invalid_dates').css('display', '');
		return;
	} else $('#nolo_card_insert_invalid_dates').css('display', 'none');

	var isAv = await checkAvailability(-1, values.product_id, values.date_from, values.date_to);

	if(!isAv){
		$('#nolo_card_insert_unavailable').css('display', '');
		return;
	} else {
		$('#nolo_card_insert_unavailable').css('display', 'none');
	} 

	var obj = makeDbRecord('nolo', values);
	obj.dep_id = logged_id;

	postElem('nolos', obj);

	hideCards('nolo');
}

async function saveNewClient(){
	var values = getElemInputs('#client_card_insert');

	var obj = makeDbRecord('client', values);
	obj.pwd = obj.name + obj.surname;

	postElem('clients', obj);

	hideCards('client');
}

async function deleteElem(prefix, collection, tab){
	var id = $(`#${prefix}_card_id`).text();

	await $.ajax({
		url: `//site202123.tw.cs.unibo.it/${collection}?id=${id}`,
		type: 'DELETE'
	});

	$(`#${prefix}_card`).css('display', 'none');

	updateTab(tab);
}

async function deleteProduct(){
	deleteElem('product', 'products', 'inventory');
}

async function deleteNolo(){
	deleteElem('nolo', 'nolos', 'nolos');
}

async function deleteClient(){
	deleteElem('client', 'clients', 'clients');
	hideHistory();
}

async function updateProduct(){
	var p_id = $('#product_card_id').text();
	var values = getElemInputs('#product_card_modify');

	var obj = makeDbRecord('product', values);
	var update = {$set : obj};

	await $.post(`//site202123.tw.cs.unibo.it/update/products?id=${p_id}`, update);

	updateTab('inventory');
	$('#product_card_modify').css('display', 'none');
}

async function updateNolo(){
	var n_id = $('#nolo_card_id').text();
	var values = getElemInputs('#nolo_card_modify');

	var days = calculateDays(values.date_from, values.date_to);
	if(days <= 0){
		$('#nolo_card_modify_invalid_dates').css('display', '');
		return;
	} else $('#nolo_card_modify_invalid_dates').css('display', 'none');


	var isAv = await checkAvailability(n_id, values.product_id, values.date_from, values.date_to);
	if(!isAv){
		$('#nolo_card_modify_unavailable').css('display', '');
		return;
	} else {
		$('#nolo_card_modify_unavailable').css('display', 'none');
	}

	var obj = makeDbRecord('nolo', values);
	obj.dep_id = logged_id;

	var update = {$set : obj};

	await $.post(`//site202123.tw.cs.unibo.it/update/nolos?id=${n_id}`, update);

	updateTab('nolos');
	$('#nolo_card_modify').css('display', 'none');
}

async function updateClient(){
	var c_id = $('#client_card_id').text();
	var values = getElemInputs('#client_card_modify');

	var obj = makeDbRecord('client', values);
	var update = {$set : obj};

	await $.post(`//site202123.tw.cs.unibo.it/update/clients?id=${c_id}`, update);

	updateTab('clients');
	$('#client_card_modify').css('display', 'none');
}

function buildFilterQuery(values){
	var query = '?';
	var numeric = ['id', 'birth', 'death'];
	for(v in values){
		var val = values[v];
		if(val == '') continue;

		var s;
		if(numeric.includes(v)) s = `${v}=${val}&`;
		else s = `${v}={"$regex":"${val}"}&`;

		query += s;
	}
	return query;
}

async function filterProducts(){
	var values = getElemInputs('#product_header');

	var query = buildFilterQuery(values);

	console.log(query);

	var res =
		await $.get('//site202123.tw.cs.unibo.it/products'+query);

	eraseTables();
	fillTable(res, 'inventory');
}

async function filterNolos(){
	var values = getElemInputs('#nolo_header');

	var query = '?';

	if(values.client != ''){
		let c_name = values.client.split(' ');
		var res;

		if(c_name.length == 1){
			res =
				await $.get(`//site202123.tw.cs.unibo.it/clients?$or=[{"name":{"$regex":"${c_name[0]}"}},{"surname":{"$regex":"${c_name[0]}"}}]`);
		}
		else {
			res =
				await $.get(`//site202123.tw.cs.unibo.it/clients?$and=[{"name":{"$regex":"${c_name[0]}"}},{"surname":{"$regex":"${c_name[1]}"}}]`);
		}

		var cquery = 'client_id={"$in":[';
		for(r in res){
			cquery +=  `${res[r].id}`;
			if(r != res.length-1) cquery += ',';
		}
		cquery += ']}&'
		query += cquery;
	}

	if(values.product != ''){
		let p_name = values.product;
		var res = await
			$.get(`//site202123.tw.cs.unibo.it/products?name={"$regex":"${p_name}"}`);

		var pquery = 'product_id={"$in":[';
		for(r in res){
			pquery +=  `${res[r].id}`;
			if(r != res.length-1) pquery += ',';
		}
		pquery += ']}&'
		query += pquery;
	}

	if(values.employee != ''){
		let d_name = values.employee.split(' ');
		var res;

		if(d_name.length == 1){
			res =
				await $.get(`//site202123.tw.cs.unibo.it/staff?$or=[{"name":{"$regex":"${d_name[0]}"}},{"surname":{"$regex":"${d_name[0]}"}}]`);
		}
		else {
			res =
				await $.get(`//site202123.tw.cs.unibo.it/staff?$and=[{"name":{"$regex":"${d_name[0]}"}},{"surname":{"$regex":"${d_name[1]}"}}]`);
		}

		var pquery = 'dep_id={"$in":[';
		for(r in res){
			pquery +=  `${res[r].id}`;
			if(r != res.length-1) pquery += ',';
		}
		pquery += ']}&'
		query += pquery;
	}

	if(values.date_from != '') query += `date_from=${values.date_from}&`;
	if(values.date_to != '') query += `date_to=${values.date_to}&`;
	if(values.status != '') query += `status=${values.status}&`;

	var res =
		await $.get('//site202123.tw.cs.unibo.it/nolos'+query);

	eraseTables();
	fillTable(res, 'nolos');
}

async function filterClients(){
	var values = getElemInputs('#clients_header');

	var query = buildFilterQuery(values);

	var res =
		await $.get('//site202123.tw.cs.unibo.it/clients'+query);

	eraseTables();
	fillTable(res, 'clients');
}

function eraseTables(){
	$('#products').html('');
	$('#people').html('');
	$('#nolo').html('');
}

async function showProduct(prod_no){
	var product = await getById('products', prod_no);

	$('#product_card_name').text(product.name);
	$('#product_card_id').text(prod_no);
	$('#product_card_age').text(`
		${Math.abs(product.birth)} ${product.birth < 0 ? 'a.C.' : ''}, ${product.birth_p} - 
		${Math.abs(product.death)} ${product.death < 0 ? 'a.C.' : ''}, ${product.death_p}
	`);
	$('#product_card_subject').text(product.subjects);

	$('#product_card_price').text(product.nolo_data.cost);

	$('#product_card_image').attr('src', product.img ? product.img : '');
	$('#product_card_image').attr('alt', product.name);

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
	$('#product_card').focus();

	window.location.href='#product_card';

}

async function showClient(client_no){
	var client = await getById('clients', client_no);

	$('#client_card_name').text(`${client.name} ${client.surname}`);
	$('#client_card_id').text(client_no);
	$('#client_card_email').text(client.email);
	$('#client_card_phone').text(client.phone);
	$('#client_card_address').text(client.address);
	$('#client_card_info').text(client.nolo_data.info != 0 ? client.nolo_data.info : '-');


	$('#client_card_modify').css('display', 'none');
	$('#client_card').css('display', '');
	$('#client_card').focus();

	window.location.href='#client_card';
}

async function showNolo(nolo_no){
	var nolo = await getById('nolos', nolo_no);

	var client = await getById('clients', nolo.client_id);

	var product = await getById('products', nolo.product_id);

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
	$('#nolo_card').focus('display', '');

	window.location.href='#nolo_card';
}

async function showHistory() {
	var c_id = $('#client_card_id').text();
	var client_nols = await $.get(`//site202123.tw.cs.unibo.it/nolos?client_id=${c_id}`);

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

	if(past_nolos.length != 0){
		for(n in past_nolos)
			$('#client_history_past')
				.append(await createHistoryCard(past_nolos[n]));
	}
	else $('#client_history_past')
		.html('<p>Nessun noleggio.</p>');

	if(current_nolos.length != 0){
		for(n in current_nolos)
			$('#client_history_present')
				.append(await createHistoryCard(current_nolos[n]));
	}
	else $('#client_history_present')
		.html('<p>Nessun noleggio.</p>');

	if(future_nolos.length != 0){
		for(n in future_nolos)
			$('#client_history_future')
				.append(await createHistoryCard(future_nolos[n]));
	}
	else $('#client_history_future')
		.html('<p>Nessun noleggio.</p>');

	$('#clients_table').css('display', 'none');
	$('#client_history').css('display', '');
	$('#client_history').focus();
}

function hideHistory() {
	$('#clients_table').css('display', '');
	$('#client_history').css('display', 'none');

	$('#client_history_past').html('');
	$('#client_history_present').html('');
	$('#client_history_future').html('');
}


async function createHistoryCard(nolo){
	var product = await getById('products', nolo.product_id);

	var tot = calculateTotal(nolo);

	return `
		<div class="col">
		  <div tabindex=0 class="card ${nolo.status == 'In ritardo' || !product ? "problem" : ''}">
			<div class="card-body card-text text-start">
			  <h3 class="card-title">${product ? product.name : 'Prodotto non in elenco.'}</h3>
			  <ul type="none">
				<li>
				  <b>Periodo:</b> da ${nolo.date_from} a ${nolo.date_to}
				</li>
				<li >
				  <b>Stato:</b> 
				  ${nolo.status}
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

async function modifyElem(prefix, collection){
	var id = $(`#${prefix}_card_id`).text();

	var elem = await getById(collection, id);

	for(name in elem){
		if(name ==  "nolo_data"){
			for(val in elem[name]){
				$(`#${prefix}_card_modify_` + val).val(elem[name][val]);
			}
		} else
			$(`#${prefix}_card_modify_` + name).val(elem[name]);
	}

	$(`#${prefix}_card`).toggle();
	$(`#${prefix}_card_modify`).toggle();
}

async function modifyProduct(){
	modifyElem('product', 'products'); 	
}

async function modifyClient(){
	modifyElem('client', 'clients'); 	
}

async function modifyNolo(){
	modifyElem('nolo', 'nolos'); 	
}

function abortModify(type){
	if(type == 'inventory'){
		prefix = 'product';
	} else if(type == 'clients'){
		prefix = 'client';
	} else if(type == 'nolos'){
		prefix = 'nolo';
	}
	$(`#${prefix}_card`).toggle();
	$(`#${prefix}_card_modify`).css(`display`, `none`);
	$(`#${prefix}_card_insert`).css(`display`, `none`);

	var s = `#${prefix}_card`;
	window.location.href = s;
}

function noloProduct(){
	$('#nolo_form :input').each(function() {
		$(this).val(0);
	});

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

	var product = await getById('products', p_id);

	var values = {};
	$('#nolo_form :input').each(function() {
		values[this.name] = $(this).val();
	});


	var days = calculateDays(values.date_from, values.date_to);
	if(days <= 0){
		$('#nolo_form_invalid_dates').css('display', '');
		return;
	} else $('#nolo_form_invalid_dates').css('display', 'none');

	if(logged){
		if(!await checkAvailability(product.id, values.date_from, values.date_to)){
			$('#nolo_form_unavailable').css('display', '');
			return;
		}
		else {
			$('#nolo_form_unavailable').css('display', 'none');
		} 
	}


	const perc = (1 - parseFloat(values.discount)/100);
	const base_cost = days * parseFloat(product.nolo_data.cost);
	const total = (base_cost * perc) + parseFloat(values.other_fees);


	$('#nolo_form_days').text(days);
	$('#nolo_form_total').text('');
	$('#nolo_form_total').text(Math.round(total * 100)/100);

	$('#nolo_form_total_result').focus();
}

function doLogin(){
	$('#header_buttons').toggle();
	$('#the_office').toggle();
	$('#login_window').toggle();
}

async function checkMailAndPwd(mail, pwd){
	var user = await $.get(`//site202123.tw.cs.unibo.it/staff?email=${mail}`);
	user = await user[0];

	if (await user.pwd == pwd){
		logged_user = await user;
		logged_id = await user.id;
		return true;
	}
	return false;
}

async function checkCredentials(){
	var values = getElemInputs('#login_form');

	var correct = await checkMailAndPwd(values.email, values.password);

	// check login
	if(!correct){
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


		$('#the_nav').append(`
			<li class="nav-item">
			  <a id="nolos_tab"
				 class="nav-link top-tabs"
				 onclick="updateTab('nolos')"
				 style="background: #eeeeee;"
				 href="#">Noleggi</a>
			</li>
			<li class="nav-item">
			  <a id="clients_tab"
				 class="nav-link top-tabs"
				 onclick="updateTab('clients')"
				 style="background: #eeeeee;"
				 href="#">Clienti</a>
			</li>
		`);


		$('.product_card_options').toggle();
		$('#header_buttons').toggle();
		$('#product_insert_button').toggle();

		$('#login_message_text').text(logged_user.name + ' ' + logged_user.surname);
		$('#login_message').toggle();

		//reset fields
		$('#login_form :input').val('');

		if(logged_user.role=='manager')
			$('#manager_link').css('display', '');

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
	$('#manager_link').css('display', 'none');

	$('#login_message_text').text('');
	$('#login_message').toggle();

	await updateTab('inventory');

	logged = false;
	logged_user = '';
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
		products = await getAll('products');
		array = products;
		$('#products').css('display', '')
	} else if (_tab == 'clients') {
		clients = await getAll('clients');
		array = clients;
		$('#people').css('display', '')
	} else {
		nolos = await getAll('nolos');
		array = nolos;
		$('#nolo').css('display', '')
	}

	fillTable(array, _tab);
}


