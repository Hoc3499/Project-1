
let form = document.getElementById('form');
let inputElement = document.querySelectorAll('input[type="text"]');

form.onsubmit = e => {
    e.preventDefault();
}

function clearInput() {
    inputElement.forEach(input => {
        input.value = '';
    })
}

