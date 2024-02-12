<html lang="">
  <nav class="card">
    <button class='cardimage' style="background-image: url({imagedisplay});"/>
  </nav>
  <label class="itemname">{itemname}</label>
</html>

<script>
  export let imagedisplay = '/resources/dungeon.png'
  export let itemname = 'Veliz Mavidad.'
</script>

<style>
  .card {
    display: flex; /* Make it a flex container */
    width: 21vw;
    height: 60vh;
    background-image: linear-gradient(#3d3d3d, #171717);
    border-radius: 1.2vw;
    box-shadow: 1vw 1vw 1vw 0 black;
    margin: auto;
    margin-top: 3vw;
    justify-self: center;
  }
  .cardimage {
    width: 21vw;
    height: 21vw;
    background-color: transparent;
		background-size: 15.4vw;
		background-repeat: no-repeat;
		background-position: center;
    border-color: rgba(0, 0, 0, 0.447);
    border-radius: 1vw;
    border-width: 0.3vw;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: 0.2vw 1vw 1vw rgba(0, 0, 0, 0.69);
  }
  .cardimage:active {
    background-color: transparent;
  }
  .itemname {
    position: absolute;
    top: 8.3vh;
    left: 6vw;
    width: 21vw;
    font-size: 2.1vw;
    font-weight: 500;
    text-align: center;
    background: -webkit-linear-gradient(#ffdfc4, #0d750a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #dbbe545e,
                0px 0px 1.5vh #7fb06e84;
  }
</style>
