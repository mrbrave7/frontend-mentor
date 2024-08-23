const btn = document.querySelector("#btn")
const input = document.querySelector("#input")
const insert = document.querySelector(".input p")

input.addEventListener("input", (e) => {
    console.log(e.target.value)
    if (validEmail(e.target.value)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        if(insert.classList.contains("show-mgs")){
            insert.classList.remove("show-mgs")
        }
    } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        insert.classList.add("show-mgs")
    }
})

function validEmail(email) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return pattern.test(email);
}

