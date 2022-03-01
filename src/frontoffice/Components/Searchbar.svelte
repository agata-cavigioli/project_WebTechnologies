<script>
import { Router, Route, Link } from "svelte-routing";

export let filosofi = "";
let search;

function searchfunction(){

  var searchphilosophers = {};
  var searchphilosophersArray = [];

  var tempurl="";
  var count = 0;

  var name = document.getElementById('NameSearch').value;
    if (name) {
      tempurl+='name={"$regex":"'+name+'"}';
      count++;}
  var place = document.getElementById('PlaceSearch').value;
    if(place) {
      if (count>0){tempurl+='&'; count++;}
      //$or=[{"death_p":{"$regex":"Gre"}},{"birth_p":{"$regex":"Gre"}}]
      tempurl+='death_p={"$regex":"'+place+'"}';
      count++;
    }

  let filters;
    if (filters=document.getElementById('home')){
      var period = document.getElementById('inputGroupPeriod').value;
      if(period) {
        //console.log(period);

        let livedfrom = 0;
        let livedto = 0;

        if (period == 'antica'){ livedfrom = -3100; livedto = 476;}
        else if (period == 'medievale'){livedfrom = 476; livedto = 1492;}
        else if (period == 'moderna'){livedfrom = 1492; livedto = 1815;}
        else if (period == 'contemporanea'){ livedfrom = 1815; livedto = 2022;}

        //searchphilosophers.birthday = livedfrom;
        //searchphilosophers.deathday = livedto;

        //birth={"$gt":"1400"}&death={"$lt":"1900"}
        if (count>0){tempurl+='&'; count++;}
        //$or=[{ "$and": [ { "birth": { "$gt": 1492 } }, { "birth": { "$lt": 1815 } } ] },{ "$and": [ { "death": { "$gt": 1492 } }, { "death": { "$lt": 1815 } } ] }]
        tempurl+='$or=[{ "$and": [ { "birth": { "$gte": '+livedfrom+' } }, { "birth": { "$lte": '+livedto+' } } ] },{ "$and": [ { "death": { "$gte": '+livedfrom+' } }, { "death": { "$lte": '+livedto+' } } ] }]';
        count++;
      }
      var costfrom = document.getElementById('costfrom').value;
      if(costfrom && !isNaN(costfrom)) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='nolo_data.cost={"$gte":'+costfrom+'}';
        count++;
      }

      var costto = document.getElementById('costto').value;
      if(costto && !isNaN(costto)) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='nolo_data.cost={"$lte":'+costto+'}';
        count++;
      }

      var birthplace = document.getElementById('birthplace').value;
      if(birthplace) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='birth_p={"$regex":"'+birthplace+'"}';
        count++;
      }

      var deathplace = document.getElementById('deathplace').value;
      if(deathplace) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='death_p={"$regex":"'+deathplace+'"}';
        count++;
      }

      var inputtematiche = document.getElementById('inputtematiche').value;
      if(inputtematiche) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='subjects={"$regex":"'+inputtematiche+'"}';
        count++;
      }

      var datefrom = document.getElementById('datefrom').value;
      if(datefrom) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='nolo_data.available_from={"$lte":"'+datefrom+'"}';
        count++;

      }

      var dateto = document.getElementById('dateto').value;
      if(dateto) {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='nolo_data.available_to={"$gte":"'+dateto+'"}';
        count++;
      }

      if(document.getElementById("discoutCheck").checked == true)
      {
        if (count>0){tempurl+='&'; count++;}
        tempurl+='nolo_data.discount={"$gt":0}';
        count++;
      }

  }
  searchphilosophersArray.push({...searchphilosophers});
  search = JSON.stringify(searchphilosophersArray);
  //console.log(tempurl);
  searchphilosophersfun(tempurl, count);

}

function searchphilosophersfun(tempurl, count){
  let searchurl = "//site202123.tw.cs.unibo.it/products";
  if (count>0) searchurl += "?" + tempurl;
  //console.log(searchurl);

  jQuery.get(searchurl, async function(data){
   filosofi = data;
   //console.log(filosofi);
  })
}

</script>

<div class="product-search">
    <div class="search-element" style='border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;'>
      <label for="NameSearch" class="search-label m-2" >Chi stai cercando?</label>
      <input id = "NameSearch" class="search-input" type="text" autocomplete="on" placeholder="Nome del filosofo" name="query" value="">
    </div>
    <div class="search-element">
      <label for="PlaceSearch" class="search-label m-2" >Dove stai cercando?</label>
      <input id = "PlaceSearch" class="search-input" type="text" placeholder="Luogo" autocomplete="on" name="location">
    </div>
    <div class="text-center">

    <Link class="searchlink search-button" id="principalsearch" on:click={searchfunction} to="/home">
        Cerca
          </Link>


    </div>
</div>
