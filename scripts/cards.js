const createButton = document.querySelector("#createBtn")
const container = document.querySelector("#container")
const textArea = document.querySelector("#userInput")
let idNumber = 1

// This way works, but a true factory function is below (and less repetitive)

// const createCard = () => {
//   if (!textArea.value) { return } // falsy or truthy
//   const newCard = document.createElement("section")
//   newCard.className = "card"
//   newCard.id = `card--${idNumber}`
//   const cardText = document.createElement("div")
//   cardText.textContent = textArea.value
//   const btnContainer = document.createElement("div")
//   const deleteBtn = document.createElement("button")
//   deleteBtn.id = `delete--${idNumber}`
//   deleteBtn.textContent = "Delete This Card"

//   container.appendChild(newCard)
//   newCard.appendChild(cardText)
//   newCard.appendChild(btnContainer)
//   btnContainer.appendChild(deleteBtn)
//   textArea.value = null
//   idNumber++
// }

// createButton.addEventListener("click", createCard)

// Element factory function
// In order to add classes, provide this format in attributesObj --> {classes: ["class1", "class2"]}
const elFactory = (elType, attributesObj, txt) => { 
  const newEl = document.createElement(elType)
  for (let attribute in attributesObj) {
    if (attribute === "classes") {
      const classesArray = attributesObj[attribute]
      classesArray.forEach(cls => {
        newEl.classList.add(cls)
      });
    } else {
      newEl[attribute] = attributesObj[attribute]
    }
  }
  newEl.textContent = txt || null
  return newEl
}

const createCard = () => {
  if (!textArea.value) { return } // falsy or truthy
  const newCard = elFactory("section", {classes: ["card"], id: `card--${idNumber}`})
  const cardText = elFactory("div", {}, textArea.value)
  const btnContainer = elFactory("div", {})
  const deleteBtn = elFactory("button", {id: `delete--${idNumber}`}, "Delete This Card")
  deleteBtn.addEventListener("click", deleteCard)
  container.appendChild(newCard)
  newCard.appendChild(cardText)
  newCard.appendChild(btnContainer)
  btnContainer.appendChild(deleteBtn)
  textArea.value = null
  idNumber++
}

createButton.addEventListener("click", createCard)

function deleteCard (event) {
  const btnID = event.target.id
  idNum = btnID.split("--")[1] // gets the second element in the array returned by using .split() method, which is the id number
  const cardToBeDeleted = document.getElementById(`card--${idNum}`)
  container.removeChild(cardToBeDeleted)
}