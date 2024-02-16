<html lang="">
  <nav class="card" on:click={showCustomPopup}>
    <nav class="cardimagebehind">
      <img class='cardimage' src="{imagedisplay}" style="left: {imagex}vw;"/>
    </nav>
  </nav>
  <label class="itemname" style="left: {leftlabel}vw;">{itemname}</label>
  <button class='buybutton' style="left: {leftbutton}vw;" on:click={() => alert('Contact Musab using discord to buy. \nDiscord Server: discord.gg/EgyMB9mPQz\nMusabs ID: itzmusab1234')}>Buy ({price} PKR)</button>

  <!-- Click popup -->
  <div class="overlay" id="overlay"></div>
  <div class="custom-popup" id="customPopup">
    <label class="popuptext" id='popuptextlabel' style="font-size: {textfontsize}vw; text-align: {xaligntext};">{info}</label>
    <button on:click={hideCustomPopup} class="popupclosebutton">Close</button>
  </div>

</html>

<script>
  export let imagedisplay = '/resources/dungeon.png'
  export let itemname = 'Veliz Mavidad.'
  export let leftlabel = 6
  export let leftbutton = 6.2
  export let price = 3
  export let imagex = 3.5
  export let info = ''
  export let textfontsize = 2
  export let verticalalign = false
  export let xaligntext = 'left'

    // Function to show the custom popup
    function showCustomPopup() {
      var popuptextlabel = document.getElementById('popuptextlabel');
      popuptextlabel.innerHTML = info
      popuptextlabel.style.fontSize = `${textfontsize}vw`
      popuptextlabel.style.textAlign = xaligntext
      if (verticalalign === true) {
        popuptextlabel.classList.add('verticalaligntext')
      }
      else {
        popuptextlabel.classList.remove('verticalaligntext')
      }
      document.body.style.overflowY = 'hidden';
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('customPopup').style.display = 'block';
    }

    // Function to hide the custom popup
    function hideCustomPopup() {
      document.body.style.overflowY = '';
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('customPopup').style.display = 'none';
    }
</script>

<style>
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
    transition: all 0.3s ease-in-out;
  }
  .buybutton:active {
    background: -webkit-linear-gradient(#905422, #00e1ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #54db62a8,
                0px 0px 1.5vh #14b4c9bb;
    font-size: 2.3vw;
  }
  .buybutton:hover {
    background: -webkit-linear-gradient(#db5f5f, #18af78);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #54db62a8,
                0px 0px 1.5vh #14b4c9bb;
    font-size: 2.3vw;
  }
</style>
