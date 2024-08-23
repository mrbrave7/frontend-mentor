const accordian = document.querySelectorAll(".accordian")
accordian.forEach((accordian) => {
    const btn = accordian.querySelector(".show")
    const path = accordian.querySelector('#show');
    const answer = accordian.querySelector(".answer")
    btn.addEventListener("click",(e) => {
        if(e.target.id === "show"){
            e.target.id = "hide"
            answer.style.display = "flex"
            path.setAttribute("d","M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z")
            path.setAttribute("fill","#301534")
        }
        else{
            e.target.id = "show"
            answer.style.display = "none"
            path.setAttribute("d","M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z")
            path.setAttribute("fill","#AD28EB")
        }
        
    })
})