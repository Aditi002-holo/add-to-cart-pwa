// Initialization of the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// firebase-database is component for 'The Firebase Realtime Database'
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-77670-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addToCartBtn = document.getElementById('add-button')
const inputEle = document.getElementById('input-field')
const shoppingList = document.getElementById('shopping-list')

addToCartBtn.addEventListener('click', function() {
    let inputValue = inputEle.value;

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {

    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for (let i in itemsArray) {
            let currentItem = itemsArray[i]
            let currenItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingList.innerHTML = `No items in the cart yet.`
    }
})

function clearShoppingListEl() {
    shoppingList.innerHTML = ``
}


function clearInputFieldEl() {
    inputEle.value = ''
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')

    newEl.textContent = itemValue

    newEl.addEventListener('click', function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingList.append(newEl)
}