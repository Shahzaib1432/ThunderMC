<html lang="">
  <nav class="card card-serverpreviewer" on:click={openurl(url)}>
    <img class='cardimage cardimage-serverpreviewer' src="{imagedisplay}"/>
    <label class="itemname">{itemname}</label>
    <label class="itemname iteminfo">{info}</label>
  </nav>

  <div class="overlay" id="overlay"></div>
  <div class="custom-popup" id="customPopup">
    <label class="popuptext" id='popuptextlabel' style="font-size: {textfontsize}vw; text-align: {xaligntext};">{info}</label>
    <button on:click={hideCustomPopup} class="popupclosebutton">Close</button>
  </div>
</html>

<script>
  export let imagedisplay = 'resources/thundermc-logo.png'
  export let itemname = 'Veliz Mavidad.'
  export let info = 'play.thundermc.online'
  export let url = 'http://play.thundermc.online'
  export let alertonclick = ''

  function openurl(url) {
    if (alertonclick === '') {
      window.open(url, '_blank')
    } else {
      showCustomPopup(alertonclick)
    }
  }
  let textfontsize = 1.5
  let verticalalign = false
  let xaligntext = 'left'

    // Function to show the custom popup
    function showCustomPopup(text) {
      var popuptextlabel = document.getElementById('popuptextlabel');
      popuptextlabel.innerHTML = text
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
  .iteminfo {
    top: 55vh;
    font-size: 1.7vw;
    text-align: center;
    position: absolute;
    font-weight: 400;
    text-align: center;
    background: -webkit-linear-gradient(#0bcadc, #12e77d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 0px 3vh #5493db5e,
                0px 0px 1.5vh #7fb06e84;
  }
  .cardimage-serverpreviewer {
    margin-top: 9vh;
    top: 3vh;
    width: 21vw;
    height: 40vh;
    border-radius: 1vw;
    object-fit: cover;
  }
</style>
