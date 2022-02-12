<script>
let count = 1;
</script>
<div class="personaltab">
<h2>
	And we can have interactive content like this
</h2>
<p>
	The count is: {count}
</p>
<button on:click={()=> count += 1}>
	Increment
</button>
<button on:click={()=> count -= 1}>
	Decrement
</button>
</div>
