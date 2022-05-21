
let inputElement = document.querySelectorAll('input[type="text"]');
let formElement = document.getElementById('form');
let nameElement = document.querySelector('.name');
let feetElement = document.querySelector('.feet');
let inchesElement = document.querySelector('.inches');
let weightElement = document.querySelector('.weight');

let regName = /^[A-Za-z0-9 ]+$/;  
let regNumber = /^(0*[1-9][1-9]*(\.[1-9]+)?|0+\.[1-9]*[1-9][1-9]*)$/;

//getData -> return.
//handleError.

formElement.onsubmit = e => {
    e.preventDefault();
}

function clearInput() {
    inputElement.forEach(input => {
        input.value = '';
    })
}

// Validate form 

function validateName() {
    if (nameElement.value.trim() === "") {
        nameElement.parentElement.querySelector('.error-message').innerHTML="Vui lòng nhập trường này!"
        nameElement.parentElement.classList.add('Invalid')
    }
    else if (!regName.test(nameElement.value.trim())) {
        nameElement.parentElement.querySelector('.error-message').innerHTML="Tên không được chứa ký tự đặc biệt!"
        nameElement.parentElement.classList.add('Invalid')
    } else {
        nameElement.parentElement.querySelector('.error-message').innerHTML=""
        nameElement.parentElement.classList.remove('Invalid')

    }
}
    nameElement.oninput = function() {
        validateName()
    }

    nameElement.onblur = function() {
        validateName()
    }

function validateHeight() {
    
    if (feetElement.value === "" || inchesElement.value === "") {
        feetElement.parentElement.querySelector('.error-message').innerHTML = "Vui lòng nhâp trường này!"
        feetElement.parentElement.classList.add('Invalid')
    } else if (!regNumber.test(feetElement.value) || !regNumber.test(inchesElement.value)) {
        feetElement.parentElement.querySelector('.error-message').innerHTML = "Trường này phải là số và lớn hơn 0!"
        feetElement.parentElement.classList.add('Invalid')

    } else {
        feetElement.parentElement.querySelector('.error-message').innerHTML = ""
        feetElement.parentElement.classList.remove('Invalid')
    }

}

    feetElement.oninput = function() {
        validateHeight()
    }

    feetElement.onblur = function() {
        validateHeight()
    }

    inchesElement.oninput = function() {
        validateHeight()
    }

    inchesElement.onblur = function() {
        validateHeight()
    }


function validateWeight() {
    if (weightElement.value === "") {
        weightElement.parentElement.querySelector('.error-message').innerHTML = "Vui lòng nhâp trường này!"
        weightElement.parentElement.classList.add('Invalid')
    } else if (!regNumber.test(weightElement.value)) {
        weightElement.parentElement.querySelector('.error-message').innerHTML = "Trường này phải là số và lớn hơn 0!"
        weightElement.parentElement.classList.add('Invalid')

    } else {
        weightElement.parentElement.querySelector('.error-message').innerHTML = ""
        weightElement.parentElement.classList.remove('Invalid')
    }
}

    weightElement.oninput = function() {
        validateWeight()
    }

    weightElement.onblur = function() {
        validateWeight()
    }

function Validate() {
    validateName()
    validateHeight()
    validateWeight()
}





