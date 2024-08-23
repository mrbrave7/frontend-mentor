const radios = document.querySelectorAll('.radios input');
const form = document.querySelector('form')
const firstName = document.querySelector('#firstname')
const lastName = document.querySelector('#lastname')
const email = document.querySelector('#email')
const firstNameError = document.querySelector('#firstNameError')
const lastNameError = document.querySelector('#lastNameError')
const emailError = document.querySelector('#emailError')
const radioError = document.querySelector("#radioError")
const messageError = document.querySelector("#messageError")
const message = document.querySelector("#message")
const check = document.querySelector("#contact")
const checkError = document.querySelector("#checkboxError")
const successmessage = document.querySelector(".success-message")
console.log(successmessage)
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (firstName.value === '') {
        firstNameError.textContent = "This field is required";
        firstName.style.borderColor = "hsl(0, 66%, 56%)"
    }
    if (lastName.value === '') {
        lastName.style.borderColor = "hsl(0, 66%, 56%)"
        lastNameError.textContent = "This frield is Required"
    }
    const emailCheck = validateEmail(email.value)
    if(!emailCheck){
        emailError.textContent = "Please Enter A Valid Email"
        email.style.borderColor = "hsl(0,66%,56%)"
    }
    if(message.value === ''){
        messageError.textContent = "This Field is Required"
        message.style.borderColor = "hsl(0,66%,56%)"
    }
    console.log(check)
    if(!check.checked){
        checkError.textContent = 'To submit this form, please consent to being contacted'
    }
    var formValid = false
    radios.forEach(radio => {
        if(radio.checked){
            formValid = true
        }
    })
    if(!formValid){
        radioError.textContent = "Please Select A Query"
    }
    successmessage.style.display = 'flex'
    setTimeout(function () {
        successmessage.style.display = 'none'
    } ,5000)
})

function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}