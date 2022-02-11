<script>
import { Router, Route, Link } from "svelte-routing";

function searchfunction(){
  var monthNames = ["January", "February"];
  var searchphilosophers = {};
  var searchphilosophersArray = [];

  var name = document.getElementById('NameSearch').value;
    if (name) searchphilosophers.name = name;
  var place = document.getElementById('PlaceSearch').value;
    if(place) searchphilosophers.place = place;


  let filters;
    if (filters=document.getElementById('home')){
      var period = document.getElementById('inputGroupPeriod').value;
      if(period) {
        let livedfrom = 0;
        let livedto = 0;
        if (period == 'antica'){ livedfrom = 3100; livedto = 476;}
        else if (period == 'medievale'){livedfrom = 476; livedto = 1492;}
        else if (period == 'moderna'){livedfrom = 1492; livedto = 1815;}
        else if (period == 'contemporanea'){ livedfrom = 1815; livedto = 2022;}

        searchphilosophers.birthday = livedfrom;
        searchphilosophers.deathday = livedto;
      }
      var costfrom = document.getElementById('costfrom').value;
      if(costfrom && !isNaN(costfrom)) searchphilosophers.costfrom = costfrom;

      var costto = document.getElementById('costto').value;
      if(costto && !isNaN(costto)) searchphilosophers.costto = costto;

      var birthplace = document.getElementById('birthplace').value;
      if(birthplace) searchphilosophers.birthplace = birthplace;

      var deathplace = document.getElementById('deathplace').value;
      if(deathplace) searchphilosophers.deathplace = deathplace;

      var inputtematiche = document.getElementById('inputtematiche').value;
      if(inputtematiche) searchphilosophers.tematiche = inputtematiche;

      var datefrom = document.getElementById('datefrom').value;
      if(datefrom) searchphilosophers.datefrom = datefrom;

      var dateto = document.getElementById('dateto').value;
      if(dateto) searchphilosophers.dateto = dateto;

      if(document.getElementById("discoutCheck").checked == true)
        searchphilosophers.discoutCheck = "true";

  }
  searchphilosophersArray.push({...searchphilosophers});
  console.log(JSON.stringify(searchphilosophersArray));
}

</script>

<div class="product-search">
    <div class="search-element" style='border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;'>
      <label class="search-label" >Who are you looking for?</label>
      <input id = "NameSearch" class="search-input" type="text" autocomplete="on" placeholder="Philosopher's name" name="query" value="">
    </div>
    <div class="search-element">
      <label class="search-label" >Where are you looking?</label>
      <input id = "PlaceSearch" class="search-input" type="text" placeholder="State" autocomplete="on" name="location">
    </div>
    <Link class="searchlink" on:click={searchfunction} to="/home" type="submit" style="color:white">
    <div class="search-button" id="principalsearch">
        Search
    </div>
    </Link>
</div>
