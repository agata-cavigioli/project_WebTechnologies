<script>
import { Router, Route, Link } from "svelte-routing";
function searchfunction(){

}
</script>

<div class="product-search">
    <div class="search-element" style='border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;'>
      <label class="search-label" >Who are you looking for?</label>
      <input class="search-input" type="text" autocomplete="on" placeholder="Philosopher's name" name="query">
    </div>
    <div class="search-element">
      <label class="search-label" >Where are you looking?</label>
      <input class="search-input" type="text" placeholder="State" autocomplete="on" name="location">
    </div>
    <div class="search-button" on:click={searchfunction}>
      <Link class="searchlink" to="/home" type="submit" style="color:white">Search</Link>
    </div>
</div>
