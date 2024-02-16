<script lang="ts">
	import Info from "./tabs/info.svelte";
	import Events from "./tabs/events.svelte";
	import Servers from "./tabs/servers.svelte";
	import Store from "./tabs/store.svelte";

	export let name
  let selectedTab = null;

  function onTopBarBtnClick(tab) {
    selectedTab = tab;
		console.log(selectedTab)
  }
	onTopBarBtnClick('1')
</script>

<main>
  <nav class='topbar'>
    <label class="websitenameinfo">{name}</label>

    <button on:click={() => onTopBarBtnClick('1')} class:selected={'1' === selectedTab} class="topbarbtn">Servers</button>
    <!-- <button on:click={() => onTopBarBtnClick('2')} class:selected={'2' === selectedTab} class="topbarbtn">Events</button> -->
    <button on:click={() => onTopBarBtnClick('3')} class:selected={'3' === selectedTab} class="topbarbtn">Store</button>
    <button on:click={() => onTopBarBtnClick('4')} class:selected={'4' === selectedTab} class="topbarbtn">Info</button>
  </nav>
	<nav class="tabpage">
    {#if selectedTab == '4'} <Info/> {/if}
    {#if selectedTab == '2'} <Events/> {/if}
    {#if selectedTab == '1'} <Servers/> {/if}
    {#if selectedTab == '3'} <Store/> {/if}
	</nav>
	<title>ThunderMC</title>
</main>

<style>
	.topbar {
		position: absolute;
		width: 100vw;
		height: 8vh;
		top: 0vh;
		left: 0vw;
		background-color: #1c1c1c;
		box-shadow: 1vh 1vh 2.8vh rgba(28, 28, 28, 0.8);
	}
	.websitenameinfo {
		position: absolute;
		top: 1vh;
		left: 1vw;
		text-transform: uppercase;
		font-family: Tahoma;
		font-size: 4.7vh;
		background: -webkit-linear-gradient(#2071cd, #0ac7ba);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	  text-shadow: 0px 0px 3vh #579dffb3;
		font-weight: 600;
	}
	.topbarbtn {
		width: 10.1vw;
		height: 8vh;
		float: right;
		border-radius: 0px;
		background: -webkit-linear-gradient(#20cd31, #0ac7ba);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	  text-shadow: 0px 0px 3vh #15ffbd5e,
								 0px 0px 1.5vh #1573ff66;
		font-weight: 600;
		font-family: Tahoma;
		font-size: 3.8vh;
		border-image: linear-gradient();
		border-width: 0px;
		border-left-width: 0.1vw;
		border-color: rgb(45, 45, 45);
		color: rgb(52, 52, 52);
		vertical-align: top;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.3, 1.4);
	}
	.selected {
			border-color: #0af05e;
			width: 15vw;
			border-left-width: 0.27vw;
			text-shadow: 0px 0px 3vh #6fffd6da, 0px 0px 1.6vh #84ff106d;
	}
	.tabpage {
		position: absolute;
		top: 8vh;
		left: 0vw;
	}
</style>
