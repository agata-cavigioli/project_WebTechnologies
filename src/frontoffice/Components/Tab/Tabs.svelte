<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>
<div id="personaltabs">
<ul>
{#each items as item}
	<li class={activeTabValue === item.value ? 'active' : ''}>
		<button class="personalbutton" on:click={handleClick(item.value)}>{item.label}</button>
	</li>
{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
	<div class="box">
		<svelte:component this={item.component}/>
	</div>
	{/if}
{/each}
</div>
