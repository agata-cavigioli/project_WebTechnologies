<script>
import DoubleRangeSlider from './DoubleRangeSlider.svelte';
import { onMount } from 'svelte';
	let start;
	let end;
	const nice = d => {
		if (!d && d !== 0) return '';
		return d.toFixed(2);
	}


</script>


<div class=" dropdown position-static">
  <button class="btn descrip border-0 btn-secondary dropdown-toggle text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Filtri di ricerca
  </button>
  <ul class="dropdown-menu mt-0 shadow border-0 w-100 border-outline-success" aria-labelledby="dropdownMenuButton1">
    <li>
		<div class="container-fluid">
		<div class="row px-2">
		  <div class="col-sm ">
		    <div class="input-group mb-3">
		      <div class="input-group-prepend">
		      <label class="input-group-text customcol-smor" for="inputGroupSelect01">Periodo</label>
		      </div>
		      <select class="custom-select form-control" id="inputGroupSelect01">
		        <option selected>Choose...</option>
		        <option value="1">Etá classica</option>
		        <option value="2">Etá medievale</option>
		        <option value="3">Etá moderna</option>
		        <option value="3">Etá contemporanea</option>
		      </select>
		    </div>
		  </div>
		  <div class="col-sm order-3">
		      <div class="input-group mb-2 mr-sm-2">
		        <div class="input-group-prepend">
		          <div class="input-group-text customcol-smor">Luogo di nascita</div>
		        </div>
		        <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Any">
		      </div>
		  </div>

			<div class="col-sm-5 order-2">
				<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend">
							<div class="input-group-text customcol-smor">Costo giornaliero da:</div>
						</div>
					<input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="0">
					<div class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor">a:</div>
					<input type="text" class="form-control" id="nlineFormInputGroupUsername2" placeholder="500">

				</div>
		  </div>
		</div>
		<div class="row px-2">
		<div class="col-sm order-3">
			<div class="input-group mb-3 ">
				<div class="input-group-prepend">
					<div class="input-group-text customcol-smor">Tematiche</div>
				</div>
				<input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Any">
			</div>
		</div>
		<div class="col-sm ">
				<div class="input-group mb-2 mr-sm-2">
					<div class="input-group-prepend">
						<div class="input-group-text customcol-smor">Luogo di morte</div>
					</div>
					<input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Any">
				</div>
		</div>

		  <div class="col-sm-5 order-2">
					<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend">
						<div class="input-group-text customcol-smor">Disponibilitá da:</div>
						</div>
					<input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="0">
					<div class="input-group-text rounded-0 border-left-0 border-right-0 customcol-smor">a:</div>
					<input type="text" class="form-control" id="nlineFormInputGroupUsername2" placeholder="500">

				</div>
		  </div>
			</div>
			<div class="row justify-content-center">
		  <div class="col-sm-2 order-7 d-flex justify-content-center align-items-center">
			<div class="form-check">
		<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
		<label class="form-check-label" style="col-smor: #495057;" for="flexCheckDefault">
			In sconto
		</label>
		</div></div>
		</div>
</div>
		</li>
  </ul>
</div>
