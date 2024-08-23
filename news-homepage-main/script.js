const menuItem = document.getElementById("menuItems")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")

openBtn.addEventListener("click", () => {
    menuItem.style.right = "-15%"
})
closeBtn.addEventListener("click", () => {
    menuItem.style.right = "-100%"
})