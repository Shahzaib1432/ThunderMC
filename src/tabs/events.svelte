<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }

  .ranks-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
  }

  .rank-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }

  .rank-card:hover {
    transform: scale(1.05);
  }

  h2 {
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .buy-button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .buy-button:hover {
    background-color: #45a049;
  }
</style>

<html lang="">
  <div class="ranks-section">
    <div class="rank-card">
      <h2>Basic Rank</h2>
      <ul>
        <li>Access to exclusive forums</li>
        <li>Custom avatar</li>
        <li>Monthly newsletter</li>
      </ul>
      <button class="buy-button">Buy Now</button>
    </div>
    
    <div class="rank-card">
      <h2>Premium Rank</h2>
      <ul>
        <li>All perks from Basic Rank</li>
        <li>Priority customer support</li>
        <li>Early access to new features</li>
      </ul>
      <button class="buy-button">Buy Now</button>
    </div>

    <!-- Add more rank cards as needed -->

  </div>
</html>