 <script>
		import { onMount } from 'svelte';
		import jQuery from 'jquery';

    function filterreset(){
      document.getElementById('inputGroupPeriod').value= "";
      document.getElementById('costfrom').value= "";
      document.getElementById('costto').value= "";
      document.getElementById('birthplace').value= "";
      document.getElementById('deathplace').value= "";
      document.getElementById('inputtematiche').value= "";
      document.getElementById('datefrom').value= "";
      document.getElementById('dateto').value = "";
      document.getElementById("discoutCheck").checked = false;

    }

</script>


<div id = "filterbar" class=" dropdown position-static">
  <button class="btn descrip border-0 btn-secondary dropdown-toggle text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Filtri di ricerca
  </button>
  <ul class="dropdown-menu mt-0 shadow border-0  border-outline-success" aria-labelledby="dropdownFilters">
    <li>
		<div class="container-fluid">
		<div class="row px-2">
		  <div class="col-sm ">
		    <div class="input-group mb-2">
		      <div class="input-group-prepend">
		      <label class="input-group-text customcol-smor" for="inputGroupSelect01">Periodo</label>
		      </div>
		      <select class="custom-select form-control" id="inputGroupPeriod">
		        <option selected value="">Choose...</option>
		        <option value="antica">Etá antica (3100 a.C. - 476 d.C)</option>
		        <option value="medievale">Etá medievale (476 d.C - 1492 d.C)</option>
		        <option value="moderna">Etá moderna (1492 d.C - 1815 d.C)</option>
		        <option value="contemporanea">Etá contemporanea (1814 d.C - oggi)</option>
		      </select>
		    </div>
		  </div>
		  <div class="col-sm order-3">
		      <div class="input-group mb-2 mr-sm-2">
		        <div class="input-group-prepend">
		          <label for="birthplace" class="input-group-text customcol-smor">Luogo di nascita</label>
		        </div>
		        <input type="text" class="form-control" id="birthplace" placeholder="Any" value="">
		      </div>
		  </div>

			<div class="col-sm-5 order-2">
				<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend">
							<label for="costfrom" class="input-group-text customcol-smor">Costo giornaliero da:</label>
						</div>
					<input type="text" class="form-control" id="costfrom" placeholder="0" value="" >
					<label for="costto" class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor">a:</label>
					<input type="text" class="form-control" id="costto" placeholder="500" value="">

				</div>
		  </div>
		</div>
		<div class="row px-2">
		<div class="col-sm order-3 order-lg-0">
			<div class="input-group mb-3 ">
				<div class="input-group-prepend">
					<label for="inputtematiche" class="input-group-text customcol-smor">Tematiche</label>
				</div>
				<input type="text" class="form-control" id="inputtematiche" placeholder="Any" value="">
			</div>
		</div>
		<div class="col-sm order-lg-3">
				<div class="input-group mb-2 mr-sm-2">
					<div class="input-group-prepend">
						<label for="deathplace" class="input-group-text customcol-smor">Luogo di morte</label>
					</div>
					<input type="text" class="form-control" id="deathplace" placeholder="Any" value="">
				</div>
		</div>

		  <div class="col-sm-5 order-2">
					<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend">
						<label for="datefrom" class="input-group-text customcol-smor">Da:</label>
						</div>
						    <input class="input-group date form-control" type="date" id="datefrom" value="">

							<label for="dateto" class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor">a:</label>
							    <input type="date" class="input-group date form-control"  id="dateto" value="">

				</div>
		  </div>
			</div>
			<div class="row px-2">
		    <div class="col">
			   <div class="form-check">
		       <input class="form-check-input" type="checkbox" value="" id="discoutCheck" tab-index="0">
		         <label class="form-check-label" style="col-smor: #495057;" for="discoutCheck">
			          In sconto
		         </label>
		     </div>
      </div>
      <div class="col">
        <button tab-index="0" class="btn btn-outline-warning waves-effect" on:click={filterreset}>Resetta i filtri</button>
      </div>
    </div>
		</li>
  </ul>

</div>
