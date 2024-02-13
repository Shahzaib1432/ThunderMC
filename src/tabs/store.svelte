<script>
  import Cardpreviewer from "./widgets/cardpreviewer.svelte";
</script>

<html>
  <!-- !!!!!!!!!!!!! KEYS !!!!!!!!!!!!!! -->
  <label class="experiencenav-info storeinfo">Keys</label>
  <div class='itemstore'>
    <Cardpreviewer imagedisplay='/resources/ruinic.webp'  itemname='Ruinic Key'  price=100 imagex=8/>
    <Cardpreviewer imagedisplay='/resources/dungeon.webp' itemname='Dungeon Key' price=150 imagex=8/>
    <Cardpreviewer imagedisplay='/resources/ender.webp'   itemname='Ender Key'   price=200 imagex=8/>
  </div>
  <label class="experiencenav-info storeinfo" style="top: 95vh;">Ranks</label>
  <div class='itemstore' style="top: 110vh;">
    <Cardpreviewer imagedisplay='/resources/adventurer.webp' itemname='Warrior' leftlabel=2 leftbutton=2.1 price=900/>
    <Cardpreviewer imagedisplay='/resources/pheonix.webp'    itemname='Mythic'  leftlabel=2 leftbutton=2.1 price=1250/>
    <Cardpreviewer imagedisplay='/resources/supreme.webp'    itemname='Legend'  leftlabel=2 leftbutton=2.1 price=1700/>
    <Cardpreviewer imagedisplay='/resources/cosmic.webp'     itemname='Heroic'  leftlabel=2 leftbutton=2.1 price=2450/>
  </div>
  <label class="experiencenav-info storeinfo" style="top: 190vh;">Kits</label>
  <div class='itemstore' style="top: 205vh;">
    <Cardpreviewer imagedisplay='/resources/adventurer-block.webp' itemname='Adventurer Kit' leftlabel=2 leftbutton=2.1 price=850/>
    <Cardpreviewer imagedisplay='/resources/pheonix-block.webp'    itemname='Pheonix Kit'    leftlabel=2 leftbutton=2.1 price=1200/>
    <Cardpreviewer imagedisplay='/resources/supreme-block.webp'    itemname='Supreme Kit'    leftlabel=2 leftbutton=2.1 price=1650/>
    <Cardpreviewer imagedisplay='/resources/cosmic-block.webp'     itemname='Cosmic Kit'     leftlabel=2 leftbutton=2.1 price=2250/>
  </div>
</html>

<style>
  .storeinfo {
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
  .itemstore {
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
