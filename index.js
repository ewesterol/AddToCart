import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-f5486-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-Btn");
const inputField = document.getElementById("input-Field");
const shoppingListDisplay = document.getElementById("disp")


addBtn.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  clearInputField()
  
  
});

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let shoppingListArray = Object.entries(snapshot.val());
    clearShoppingListDisplay();
    for (let i = 0; i < shoppingListArray.length; i++) {
      let currentItem = shoppingListArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      appendShoppingItem(currentItem);
    }
  } else {
    shoppingListDisplay.innerHTML= "No items here"
  }
  
});


function appendShoppingItem(item) {
  let itemID = item[0]
  let itemValue= item[1]
  let newList = document.createElement("li")
  newList.textContent = itemValue;
  newList.addEventListener("dblclick", function() {
    let exactStoryIDLocation = ref(database, `shoppingList/${itemID}`);
    remove(exactStoryIDLocation);
  })
  shoppingListDisplay.append (newList)
}
function clearInputField() {
  inputField.value = "";
}
function clearShoppingListDisplay() {
  shoppingListDisplay.innerHTML = "";
}