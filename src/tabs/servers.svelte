<script lang="ts">
  import Serverpreviewer from "./widgets/serverpreviewer.svelte";
  let thundermcjoiningsteps = 'How to Join ThunderMC:\n  • Open Minecraft\n  • Click on Multiplayer\n  • Add a server with the following ip: play.thundermc.online\n  • Join the server!'
  thundermcjoiningsteps = thundermcjoiningsteps.replaceAll('\n', '<br>')
  thundermcjoiningsteps = thundermcjoiningsteps.replaceAll(' ', '&nbsp;')
</script>

<html lang="">
  <!-- !!!!!!!!!!!!! KEYS !!!!!!!!!!!!!! -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo">Minecraft Servers</label>
  <div class='serverholder mcstyle'>
    <Serverpreviewer imagedisplay='resources/thundermc-logo.webp' itemname='ThunderMC' alertonclick={thundermcjoiningsteps}/>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo" style="top: 95vh;">Discord Servers</label>
  <div class='serverholder discordstyle' style="top: 110vh;">
    <Serverpreviewer imagedisplay='resources/thundermc-logo.webp' itemname='ThunderMC' info='discord.gg/WmXrdwMw' url='https://discord.gg/WmXrdwMw'/>
    <Serverpreviewer imagedisplay='resources/wavestudios-logo.webp' itemname='Wave Studios' info='discord.gg/JHk5kZGu' url='https://discord.gg/JHk5kZGu'/>
  </div>
</html>

<style>
  .discordstyle {
    background-image: linear-gradient(#121212, #3941d823);
  }
  .mcstyle {
    background-image: linear-gradient(#121212, #39d85412);
  }
  .serverholder {
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

