<script lang="ts">
  import Cardpreviewer from "./widgets/cardpreviewer.svelte";
  let benefits = {

    'Heroic': [
      'Customizable Discord Profile',
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
      '35000$ Instant In-game Money',
      'Exclusive Access to Special Discord Chats',
      'Access to /workbench',
      'Access to /smithingtable',
      'Exclusive Warrior Tag',
      'Exclusive Chat Color',
      'Exclusive Name Color',
    ]
  }
  let kititems = {
    'Pheonix': {
        'Pheonix Helmet': [
            'Aqua Affinity', 
            'Blast Protection 2', 
            'Fire Protection 2',
            'Protection 4',
            'Mending',
            'Respiration 3',
            'Thorns 3',
            'Unbreaking 4'],
        'Pheonix Chestplate': [
            'Blast Protection 2', 
            'Fire Protection 2',
            'Protection 4',
            'Mending',
            'Thorns 3',
            'Unbreaking 4'],
        'Pheonix Leggings': [
            'Blast Protection 2', 
            'Fire Protection 2',
            'Protection 4',
            'Mending',
            'Thorns 3',
            'Unbreaking 4'],
        'Pheonix Boots': [
            'Blast Protection 2', 
            'Fire Protection 2',
            'Protection 4',
            'Mending',
            'Thorns 3',
            'Unbreaking 4',
            'Feather Falling 4',
            'Depth Strider 4'],
        'Pheonix Sword': [
          'Unbreaking 4',
          'Mending',
          'Sweeping Edge 4',
          'Sharpness 5',
          'Fire Aspect 2'
        ],
        'Pheonix Axe': [
          'Unbreaking 4',
          'Mending',
          'Sharpness 5',
          'Effeciency 5'
        ],
        'Pheonix Pickaxe': [
          'Unbreaking 4',
          'Mending',
          'Fortune 3',
          'Effeciency 5'
        ],
        '64x Golden Apples': '',
        '2x Totem of Undying': '',
        '2x Dungeon Key': '',
        '2x Ruinic Key': '',
    },
    'Cosmic': {
        'Cosmic Sword': [
            'Sharpness 4',
            'Bane of Arthopods 4',
            'Fire Aspect 4',
            'Looting 5', 
            'Sweeping Edge 5', 
            'Unbreaking 5', 
            'Mending'],
            'Cosmic Pickaxe': [
            'Effeciency 6',
            'Fortune 4',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Axe': [
            'Effeciency 6',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Shovel': [
            'Effeciency 6',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Helmet': [
            'Aqua Affinity 4',
            'Blast Protection 4',
            'Projectile Protection 4',
            'Protection 6',
            'Respiration 5',
            'Thorns 5',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Chestplate': [
            'Blast Protection 4',
            'Projectile Protection 4',
            'Protection 6',
            'Thorns 5',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Leggings': [
            'Blast Protection 4',
            'Projectile Protection 4',
            'Protection 6',
            'Thorns 5',
            'Unbreaking 5', 
            'Mending'],
        'Cosmic Boots': [
            'Depth Strider 5',
            'Feather Falling 5',
            'Blast Protection 4',
            'Projectile Protection 4',
            'Protection 6',
            'Thorns 5',
            'Unbreaking 5', 
            'Mending'],
        '64x Golden Apple':'',
        '4x Ruinic Key':'',
        '4x Dungeon Key':'',
        '64x Obsidian':'',
        '64x End Crystal':''
    },
    'Adventurer': {
      'Adventurer Helmet'    :['Aqua Affinity', 'Mending', 'Protection 4', 'Respiration 3', 'Thorns 3', 'Unbreaking 3'],
      'Adventurer Chestplate':['Mending', 'Protection 4',  'Thorns 3', 'Unbreaking 3'],
      'Adventurer Leggings'  :['Mending', 'Protection 4',  'Thorns 3', 'Unbreaking 3'],
      'Adventurer Boots'     :['Mending', 'Protection 4',  'Thorns 3', 'Unbreaking 3', 'Feather Falling 3', 'Depth Strider 3'],
      'Adventurer Sword'     :['Mending', 'Sharpness 4',   'Sweeping Edge 3', 'Fire Aspect 2', 'Unbreaking 3'],
      'Adventurer Axe'       :['Mending', 'Sharpness 4',   'Effeciency 4', 'Unbreaking 3'],
      'Adventurer Pickaxe'   :['Mending', 'Fortune 3',     'Effeciency 4', 'Unbreaking 3'],
      '64x Golden Apples':'',
      '1x Totem of Undying':'',
    },
    'Supreme': {
        'Supreme Sword': [
            'Sharpness 6',
            'Bane of Arthopods 3',
            'Fire Aspect 3',
            'Looting 4', 
            'Sweeping Edge 4', 
            'Unbreaking 4', 
            'Mending'],
        'Supreme Pickaxe': [
            'Effeciency 6',
            'Fortune 4',
            'Unbreaking 4', 
            'Mending'],
        'Supreme Axe': [
            'Effeciency 6',
            'Sharpness 6',
            'Unbreaking 4', 
            'Mending'],
        'Supreme Helmet': [
            'Aqua Affinity 3',
            'Blast Protection 3',
            'Projectile Protection 3',
            'Fire Protection 3',
            'Protection 5',
            'Respiration 4',
            'Thorns 4',
            'Unbreaking 4',
            'Mending'],
        'Supreme Chestplate': [
            'Blast Protection 3',
            'Projectile Protection 3',
            'Protection 5',
            'Fire Protection 3',
            'Thorns 4',
            'Unbreaking 4', 
            'Mending'],
        'Supreme Leggings': [
            'Blast Protection 3',
            'Projectile Protection 3',
            'Protection 5',
            'Fire Protection 3',
            'Thorns 4',
            'Unbreaking 4', 
            'Mending'],
        'Supreme Boots': [
            'Depth Strider 4',
            'Feather Falling 4',
            'Blast Protection 3',
            'Projectile Protection 3',
            'Fire Protection 3',
            'Protection 5',
            'Thorns 4',
            'Unbreaking 4', 
            'Mending'],
        '64x Golden Apple':'',
        '3x Ruinic Key':'',
        '3x Dungeon Key':'',
    },
  }

  function getBenefitsOfRank(rank) {
    let output = ''
    for (let i = 0; i <= benefits[rank].length - 1; i++) {
      output += `&nbsp;&nbsp;• &nbsp;${benefits[rank][i]}<br>`
    }
    return output
  }
  function getItemsOfKit(kit) {
    let output = `${kit} Kit Items:<br>`;
    const keys = Object.keys(kititems[kit]);

    for (let i = 0; i < keys.length; i++) {
      let enchants = ' • ' + String(kititems[kit][keys[i]]).replaceAll(',', `<br>${'&nbsp;'.repeat(9)}• `)
      let itemNameInFL = keys[i]
      if (enchants !== ' • ') {
        output += `&nbsp;&nbsp;&nbsp;&nbsp;• ${itemNameInFL}: <br>${'&nbsp;'.repeat(8)}${enchants}<br>`;
      } else {
        output += `&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;${itemNameInFL}<br>`;
      }
    }

    return output;
  }


</script>

<html lang="">
  <!-- !!!!!!!!!!!!! KEYS !!!!!!!!!!!!!! -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo">Keys</label>
  <div class='itemstore'>
    <Cardpreviewer imagedisplay='resources/ruinic.webp'  itemname='Ruinic Key'  price={100} verticalalign={true} imagex={8} xaligntext='center' info='This key can be used to open the Ruinic Crate' />
    <Cardpreviewer imagedisplay='resources/dungeon.webp' itemname='Dungeon Key' price={150} verticalalign={true} imagex={8} xaligntext='center' info='This key can be used to open the Dungeon Crate'/>
    <Cardpreviewer imagedisplay='resources/ender.webp'   itemname='Ender Key'   price={200} verticalalign={true} imagex={8} xaligntext='center' info='This key can be used to open the Ender Crate'  textfontsize={2.01}/>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo" style="top: 95vh;">Ranks</label>
  <div class='itemstore' style="top: 110vh;">
    <Cardpreviewer imagedisplay='resources/adventurer.webp' itemname='Adventurer' leftlabel={2} leftbutton={2.1} price={900}  textfontsize={1.9} info='Warrior Rank Perks:<br>{getBenefitsOfRank('Warrior')}'/>
    <Cardpreviewer imagedisplay='resources/pheonix.webp'    itemname='Pheonix'  leftlabel={2} leftbutton={2.1} price={1250} textfontsize={1.9} info='Mythic Rank Perks:<br>{getBenefitsOfRank('Mythic')}'/>
    <Cardpreviewer imagedisplay='resources/supreme.webp'    itemname='Supreme'  leftlabel={2} leftbutton={2.1} price={1700} textfontsize={1.9} info='Legend Rank Perks:<br>{getBenefitsOfRank('Legend')}'/>
    <Cardpreviewer imagedisplay='resources/cosmic.webp'     itemname='Cosmic'  leftlabel={2} leftbutton={2.1} price={2450} textfontsize={1.9} info='Heroic Rank Perks:<br>{getBenefitsOfRank('Heroic')}'/>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="experiencenav-info storeinfo" style="top: 190vh;">Kits</label>
  <div class='itemstore' style="top: 205vh;">
    <Cardpreviewer imagedisplay='resources/adventurer-block.webp' itemname='Adventurer Kit' leftlabel={2} leftbutton={2.1} price={850}  info={getItemsOfKit('Adventurer')}/>
    <Cardpreviewer imagedisplay='resources/pheonix-block.webp'    itemname='Pheonix Kit'    leftlabel={2} leftbutton={2.1} price={1200} info={getItemsOfKit('Pheonix')}/>
    <Cardpreviewer imagedisplay='resources/supreme-block.webp'    itemname='Supreme Kit'    leftlabel={2} leftbutton={2.1} price={1650} info={getItemsOfKit('Supreme')}/>
    <Cardpreviewer imagedisplay='resources/cosmic-block.webp'     itemname='Cosmic Kit'     leftlabel={2} leftbutton={2.1} price={2250} info={getItemsOfKit('Cosmic')}/>
  </div>
</html>

<style>
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

