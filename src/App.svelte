<script>
	export let name;
</script>

<main>
	<nav class='topbar'>
		<label class="websitenameinfo">{name}</label>

		<button class="topbarbtn">Events</button>
		<button class="topbarbtn">Store</button>
		<button class="topbarbtn">Info</button>
		<button class="topbarbtn">Servers</button>
	</nav>
</main>

<style>
	.topbar {
		position: absolute;
		width: 100vw;
		height: 8vh;
		top: 0vh;
		left: 0vw;
		background-color: #1c1c1c;
		box-shadow: 1vh 1vh 10px rgba(28, 28, 28, 0.8);
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
		font-weight: 800;
	}
	.topbarbtn {
		width: 100px;
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
		border-image: linear-gradient();
		border-width: 0px;
		border-left-width: 1px;
		border-color: rgb(45, 45, 45);
		color: rgb(52, 52, 52);
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.3, 1);
}
.topbarbtn:focus {
    border-color: white;
		width: 150px;
}
</style>