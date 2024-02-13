<html lang="">
  <nav class="card">
    <nav class="cardimagebehind">
      <img class='cardimage' src="{imagedisplay}" style="left: {imagex}vw;"/>
    </nav>
  </nav>
  <label class="itemname" style="left: {leftlabel}vw;">{itemname}</label>
  <button class='buybutton' style="left: {leftbutton}vw;" on:click={() => alert('Contact Musab using discord to buy. \nDiscord Server: discord.gg/EgyMB9mPQz\nMusabs ID: itzmusab1234')}>Buy ({price} PKR)</button>
</html>

<script>
  export let imagedisplay = '/resources/dungeon.png'
  export let itemname = 'Veliz Mavidad.'
  export let leftlabel = 6
  export let leftbutton = 6.2
  export let price = 3
  export let imagex = 3.5
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
    image-rendering: optimizeSpeed;
    object-fit: contain;
    position: absolute;
    top: 9vh;
    width: 18vw;
    height: 44vh;
  }
  .cardimagebehind {
    width: 21vw;
    height: 44vh;
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
    top: 7.6vh;
    width: 21vw;
    font-size: 2.1vw;
    font-weight: 500;
    text-align: center;
    background: -webkit-linear-gradient(#ffdfc4, #e7cb12);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #dbbe545e,
                0px 0px 1.5vh #7fb06e84;
  }
  .buybutton {
    position: absolute;
    top: 50vh;
    width: 21vw;
    height: 16vh;
    font-size: 2.1vw;
    font-weight: 500;
    text-align: center;
    background: -webkit-linear-gradient(#ffdfc4, #0d750a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #dbbe545e,
                0px 0px 1.5vh #7fb06e84;
    border-color: transparent;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1.7);    
  }
  .buybutton:active {
    background: -webkit-linear-gradient(#905422, #00e1ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #54db62a8,
                0px 0px 1.5vh #14b4c9bb;
    font-size: 2.3vw;
  }
</style>
