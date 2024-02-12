<script>
  import Cardpreviewer from "./widgets/cardpreviewer.svelte";
</script>

<html>
  <!-- !!!!!!!!!!!!! KEYS !!!!!!!!!!!!!! -->
  <label class="experiencenav-info keysinfo">Keys</label>
  <div class='keysitemstore'>
    <Cardpreviewer imagedisplay='/resources/dungeon.png'/>
    <Cardpreviewer imagedisplay='/resources/ender.png'/>
    <Cardpreviewer imagedisplay='/resources/ruinic.png'/>
  </div>
</html>

<style>
  .keysinfo {
    top: 3vh;   
    left: 25vw;
    width: 50vw;
    text-align: center;
    font-size: 3vw;
    background: -webkit-linear-gradient(#ff8f8f, #f4e40bbb) !important;
    -webkit-background-clip: text !important;
    text-shadow: 0px 0px 3vh #ff6f0075,
                 0px 0px 1.5vh #baf40b54 !important;
  }

  .keysitemstore {
    position: absolute;
    top: 15vh;
    display: flex; /* Use flex to display cards horizontally */
    justify-content: center; /* Center cards horizontally */
    align-items: center; /* Center cards vertically */
    background-color: rgb(27, 27, 27);
    width: 100vw;
    height: 75vh;
    box-shadow: 1vw 0 3vw 0 black;
  }
</style>
