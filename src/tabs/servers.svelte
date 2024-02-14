<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minecraft Server</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh; /* Set body height to fill the viewport */
      display: flex;
      justify-content: center;
      align-items: center; /* Align items to the center of the body */
      background-color: #121212; /* Dark background color */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Use Segoe UI font */
    }

    .server-tab {
      background-color: #212121; /* Darker background color for server tab */
      border-radius: 20px; /* Rounded corners */
      padding: 30px; /* Add more padding */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* Soft shadow effect */
      display: flex;
      flex-direction: column; /* Align items vertically */
      align-items: center;
      position: relative; /* Make sure the arrow is positioned relative to this container */
    }

    .server-icon {
      width: 100px; /* Increase size of server icon */
      height: 100px; /* Increase size of server icon */
      background-image: url('https://cdn.discordapp.com/icons/1158474743377313904/6924f6ee7d7fe469dad8d371d0a72a92.webp?size=100');
      background-size: cover; /* Ensure the image covers the entire element */
      background-position: center; /* Center the image */
      border-radius: 50%; /* Make it circular */
      margin-bottom: 20px; /* Add space below the icon */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Add shadow to the icon */
    }

    .server-info {
      color: #FFFFFF; /* White text color */
      text-align: center; /* Center the text */
      margin-bottom: 20px; /* Add space below the server information */
    }

    .server-name {
      font-size: 32px; /* Larger font size for server name */
      margin-bottom: 8px; /* Add more space between server name and IP */
      color: #FFD700; /* Gold color for Thunder MC */
    }

    .server-ip {
      font-size: 18px; /* Larger font size for server IP */
    }

    .discord-button {
      background-color: #7289DA; /* Discord brand color */
      color: #FFFFFF; /* White text color */
      padding: 10px 20px; /* Add padding */
      border: none; /* Remove border */
      border-radius: 5px; /* Add slight border radius */
      cursor: pointer; /* Change cursor to pointer on hover */
      transition: background-color 0.3s; /* Smooth transition for background color */
    }

    .discord-button:hover {
      background-color: #5F73BC; /* Darken the background color on hover */
    }
  </style>
</head>
<body>
  <div class="server-tab">
    <div class="server-icon"></div>
    <div class="server-info">
      <div class="server-name">Thunder MC</div>
      <div class="server-ip">IP: play.thundermc.online</div>
    </div>
    <button class="discord-button" onclick="window.open('https://discord.gg/rWTbGRfhDK', '_blank')">Discord Link</button>
  </div>
</body>
</html>
