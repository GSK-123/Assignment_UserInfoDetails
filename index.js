const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const userClickedInfo = document.getElementById("user-clicked-info");

async function getUserInfo() {
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData);
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
      <img src=${user.avatar} class="card-img-top" alt="...">
      <div class="card-body">
        <h1>${user.first_name} ${user.last_name}</h1>
        <p class="card-text">${user.email}</p>
        <button class="btn btn-primary" onclick="getDetails(${user.id})">Get Details</button>
      </div>
    </div>
  `;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
  for (let i = 0; i < userData.length; i++) {
    createCardUI(userData[i]);
  }
}

function getDetails(userId) {
    const selectedUser = userInfoData.find(user => 
        user.id === userId
    ); 
    if (selectedUser) {
        const detailsUI = `
      <div class="card m-4" style="width: 18rem;">
        <img src=${selectedUser.avatar} class="card-img-top" alt="...">
        <div class="card-body">
          <h1>${selectedUser.first_name} ${selectedUser.last_name}</h1>
          <p class="card-text">${selectedUser.email}</p>
          <button class="btn btn-danger" onclick="hideDetails()">Hide Details</button>
        </div>
      </div>
    `;
    userClickedInfo.innerHTML = detailsUI;
    }
}

function hideDetails() {
    userClickedInfo.innerHTML = "";
}

getUserInfo();
