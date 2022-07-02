// handle submit.
getElement().formElement.onsubmit = (e) => {
  e.preventDefault()
}

// handle clear input.
function clearInput() {
  getElement().inputElement.forEach((input) => {
    input.value = ''
  })
}

// get Element
function getElement() {
  let formElement = document.getElementById('form')
  let inputElement = document.querySelectorAll('input[type="text"]')
  let nameElement = document.querySelector('.name')
  let feetElement = document.querySelector('.feet')
  let inchesElement = document.querySelector('.inches')
  let weightElement = document.querySelector('.weight')

  let errorElement = document.querySelectorAll('.error-message')
  let selectElement = document.getElementById('diet')
  let optionElement = selectElement.options[selectElement.selectedIndex]

  let regName = /^[A-Za-z0-9 ]+$/
  let regNumber = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/

  return {
    formElement,
    inputElement,
    nameElement,
    feetElement,
    inchesElement,
    weightElement,
    errorElement,
    selectElement,
    optionElement,
    regName,
    regNumber,
  }
}

// Validate form

getElement().nameElement.oninput = function () {
  validateName()
}

getElement().feetElement.oninput = function () {
  validateHeight()
}

getElement().inchesElement.oninput = function () {
  validateHeight()
}

getElement().weightElement.oninput = function () {
  validateWeight()
}

getElement().nameElement.onblur = function () {
  validateName()
}

getElement().feetElement.onblur = function () {
  validateHeight()
}

getElement().inchesElement.onblur = function () {
  validateHeight()
}

getElement().weightElement.onblur = function () {
  validateWeight()
}

function validateName() {
  if (getElement().nameElement.value.trim() === '') {
    getElement().nameElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Vui lòng nhập trường này!'
    getElement().nameElement.parentElement.classList.add('Invalid')
  } else if (
    !getElement().regName.test(getElement().nameElement.value.trim())
  ) {
    getElement().nameElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Tên không được chứa ký tự đặc biệt!'
    getElement().nameElement.parentElement.classList.add('Invalid')
  } else {
    getElement().nameElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = ''
    getElement().nameElement.parentElement.classList.remove('Invalid')
  }
}

function validateHeight() {
  if (
    getElement().feetElement.value === '' ||
    getElement().inchesElement.value === ''
  ) {
    getElement().feetElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Vui lòng nhâp trường này!'
    getElement().feetElement.parentElement.classList.add('Invalid')
  } else if (
    !getElement().regNumber.test(getElement().feetElement.value) ||
    !getElement().regNumber.test(getElement().inchesElement.value)
  ) {
    getElement().feetElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Trường này phải là số và lớn hơn 0!'
    getElement().feetElement.parentElement.classList.add('Invalid')
  } else {
    getElement().feetElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = ''
    getElement().feetElement.parentElement.classList.remove('Invalid')
  }
}

function validateWeight() {
  if (getElement().weightElement.value === '') {
    getElement().weightElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Vui lòng nhâp trường này!'
    getElement().weightElement.parentElement.classList.add('Invalid')
  } else if (!getElement().regNumber.test(getElement().weightElement.value)) {
    getElement().weightElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = 'Trường này phải là số và lớn hơn 0!'
    getElement().weightElement.parentElement.classList.add('Invalid')
  } else {
    getElement().weightElement.parentElement.querySelector(
      '.error-message',
    ).innerHTML = ''
    getElement().weightElement.parentElement.classList.remove('Invalid')
  }
}

function Validate() {
  validateName()
  validateHeight()
  validateWeight()
}

// dinoContructor
/** @description
 * @param {object} dinoData information dinos.
 */
function DinoConstructor(dinoData) {
  this.species = dinoData.species
  this.weight = dinoData.weight
  this.height = dinoData.height
  this.diet = dinoData.diet
  this.where = dinoData.where
  this.when = dinoData.when
  this.fact = dinoData.fact
}

function Human(species, name, weight, height, diet) {
  DinoConstructor.call(this, species, name, weight, height, diet)
  this.species = species
  this.name = name
  this.weight = weight
  this.height = height
  this.diet = diet
}

Human.prototype = Object.create(DinoConstructor.prototype)
Human.prototype.constructor = Human

// get Dinos

let dinoArray = []

fetch('./dino.json')
  .then((response) => response.json())
  .then((data) => {
    dinoArray = createDinoArray(data.Dinos)
  })

function createDinoArray(dinos) {
  dinos.forEach((dino) => {
    dinoArray.push(new DinoConstructor(dino))
  })

  return dinoArray
}

// Handle Error
function handleError() {
  let errorMessage = []
  let isError = false

  for (let i = 0; i < getElement().errorElement.length; i++) {
    errorMessage.push(getElement().errorElement[i].innerText)
  }

  let checkErrorMessage = errorMessage.every((value) => value === '')

  if (checkErrorMessage) {
    return (isError = true)
  }
  return isError
}

// getHumanData
function getHumanData() {
  Validate()
  if (handleError()) {
    let species = 'Human'
    let name = getElement().nameElement.value
    let height =
      parseFloat(getElement().feetElement.value * 12) +
      parseFloat(getElement().inchesElement.value)
    let weight = (getElement().weightElement.value / 2.2046).toFixed(1)
    let diet = getElement().optionElement.value

    return new Human(species, name, height, weight, diet)
  }
}

/**  @description
 * @description check for human less than, greater than or same weight as dino.
 * @param {number} humanWeight human weight.
 * @return {string} give information on weight compartion resul between human and dino.
 **/

DinoConstructor.prototype.compareWeight = function compareWeight(humanWeight) {
  return humanWeight < this.weight
    ? `${this.species} is ${(this.weight / humanWeight).toFixed(
        1,
      )} times heavier than you.`
    : humanWeight > this.weight
    ? ` You are ${(humanWeight / this.weight).toFixed(1)} times heavier than ${
        this.species
      }.`
    : ` You weigh much as ${this.species}.`
}

/**  @description
 * @description check for human less than, greater than or same height as dino.
 * @param {number} humanHeight human height.
 * @return {string} give information on height compartion result between human and dino.
 **/

DinoConstructor.prototype.compareHeight = function compareHeight(humanHeight) {
  return humanHeight < this.height
    ? `${this.species} is ${(this.height / humanHeight).toFixed(
        1,
      )} times taller than you.`
    : humanHeight > this.height
    ? ` You are ${(humanHeight / this.height).toFixed(1)} times taller than ${
        this.species
      }.`
    : ` You heigh the same height a ${this.species}.`
}

/** @description
 * @description compare diet human and dinos.
 * @param {*} humanDiet human diet.
 * @returns {string}  give information on diet compartion result between human and dino.
 */

DinoConstructor.prototype.compareDiet = function compareDiet(humanDiet) {
  return humanDiet === this.diet
    ? `You have the same diet as ${this.species}.`
    : `You and ${this.species} has different diets.`
}

document.querySelector('.btn-compare').onclick = function () {
  const dFrag = document.createDocumentFragment()
  const human = getHumanData()
  if (!human) {
    return
  }

  dinoArray.splice(4, 0, human)
  console.log(dinoArray)

  for (let index in dinoArray) {
    const li = document.createElement('li')

    li.innerHTML = `
          <h3>${dinoArray[index].species}</h3>
          <img src="images/${dinoArray[index].species}.png" />
          <p>${dinoArray[index].compareHeight(human.height)}</p>
          <p>${dinoArray[index].compareWeight(human.weight)}</p>
          <p>${dinoArray[index].compareDiet(human.diet)}</p>
      `

    li.classList.add('dino-item')
    dFrag.appendChild(li)
  }
  document.querySelector('.myList').appendChild(dFrag)

  let container = document.querySelector('.container')
  let ul = document.querySelector('.myList')

  container.classList.add('hide')
  ul.classList.remove('hide')
}
