<script>
  import Cardpreviewer from "./widgets/cardpreviewer.svelte";
  let benefits = {

    'Heroic': [
      'Customizable Discord Profile',
      'Discount on shop of 20%',
      '100000$ Instant In-game Money',
      'Exclusive Access to Special Discord Chats',
      'Access to /workbench',
      'Access to /smithingtable',
      'Access to /grindstone',
      'Access to /stonecutter',
      'Access to /anvil',
      'Access to /compass',
      'Access to /condense',
      'Access to /recipe',
      'Access to /nick',
      'Access to /sucide',
      'Access to /chat colors',
      'Access to /fly',
      'Access to /feed (cooldown 10 mins)',
      'Access to /heal (cooldown 12 hours)',
      'Access to /itemrename',
      'Exclusive Heroic Tag',
      'Exclusive Chat Color',
      'Exclusive Name Color',
      'Exclusive Ability to Rename with Colors'
    ],

    'Legend': [
      'Customizable Discord Profile',
      'Discount on shop of 15%',
      '80000$ Instant In-game Money',
      'Exclusive Access to Special Discord Chats',
      'Access to /workbench',
      'Access to /smithingtable',
      'Access to /anvil',
      'Access to /compass',
      'Access to /condense',
      'Access to /recipe',
      'Access to /nick',
      'Access to /sucide',
      'Access to /chat colors',
      'Access to /itemrename',
      'Exclusive Legend Tag',
      'Exclusive Chat Color',
      'Exclusive Name Color',
      'Exclusive Ability to Rename with Colors'
    ],

    'Mythic': [
      'Customizable Discord Profile',
      'Discount on shop of 10%',
      '60000$ Instant In-game Money',
      'Exclusive Access to Special Discord Chats',
      'Access to /workbench',
      'Access to /smithingtable',
      'Access to /anvil',
      'Access to /compass',
      'Access to /condense',
      'Exclusive Mythic Tag',
      'Exclusive Chat Color',
      'Exclusive Name Color',
    ],

    'Warrior': [
      'Customizable Discord Profile',
      'Discount on shop of 5%',
      '35000$ Instant In-game Money',
      'Exclusive Access to Special Discord Chats',
      'Access to /workbench',
      'Access to /smithingtable',
      'Exclusive Warrior Tag',
      'Exclusive Chat Color',
      'Exclusive Name Color',
    ]
  }

  function getBenefitsOfRank(rank) {
    let output = ''
    for (let i = 0; i <= benefits[rank].length - 1; i++) {
      output += `• ${benefits[rank][i]}<br>`
    }
    return output
  }

</script>

<html lang="">
  <!-- !!!!!!!!!!!!! KEYS !!!!!!!!!!!!!! -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo">Keys</label>
  <div class='itemstore'>
    <Cardpreviewer imagedisplay='resources/ruinic.webp'  itemname='Ruinic Key'  price=100 verticalalign={true} imagex=8 info='This key can be used to open the Ruinic Crate' />
    <Cardpreviewer imagedisplay='resources/dungeon.webp' itemname='Dungeon Key' price=150 verticalalign={true} imagex=8 info='This key can be used to open the Dungeon Crate'/>
    <Cardpreviewer imagedisplay='resources/ender.webp'   itemname='Ender Key'   price=200 verticalalign={true} imagex=8 info='This key can be used to open the Ender Crate'  textfontsize=2.01/>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo" style="top: 95vh;">Ranks</label>
  <div class='itemstore' style="top: 110vh;">
    <Cardpreviewer imagedisplay='resources/adventurer.webp' itemname='Warrior' leftlabel=2 leftbutton=2.1 price=900  textfontsize=2   info='Warrior Rank Perks:<br>{getBenefitsOfRank('Warrior')}'/>
    <Cardpreviewer imagedisplay='resources/pheonix.webp'    itemname='Mythic'  leftlabel=2 leftbutton=2.1 price=1250 textfontsize=1.7 info='Mythic Rank Perks:<br>{getBenefitsOfRank('Mythic')}'/>
    <Cardpreviewer imagedisplay='resources/supreme.webp'    itemname='Legend'  leftlabel=2 leftbutton=2.1 price=1700 textfontsize=1.7 info='Legend Rank Perks:<br>{getBenefitsOfRank('Legend')}'/>
    <Cardpreviewer imagedisplay='resources/cosmic.webp'     itemname='Heroic'  leftlabel=2 leftbutton=2.1 price=2450 textfontsize=1.7 info='Heroic Rank Perks:<br>{getBenefitsOfRank('Heroic')}'/>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo" style="top: 190vh;">Kits</label>
  <div class='itemstore' style="top: 205vh;">
    <Cardpreviewer imagedisplay='resources/adventurer-block.webp' itemname='Adventurer Kit' leftlabel=2 leftbutton=2.1 price=850/>
    <Cardpreviewer imagedisplay='resources/pheonix-block.webp'    itemname='Pheonix Kit'    leftlabel=2 leftbutton=2.1 price=1200/>
    <Cardpreviewer imagedisplay='resources/supreme-block.webp'    itemname='Supreme Kit'    leftlabel=2 leftbutton=2.1 price=1650/>
    <Cardpreviewer imagedisplay='resources/cosmic-block.webp'     itemname='Cosmic Kit'     leftlabel=2 leftbutton=2.1 price=2250/>
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

