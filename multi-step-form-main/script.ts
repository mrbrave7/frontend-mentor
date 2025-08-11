const plan_toggeler_btn = document.querySelector(".toggle-plan-btn") as HTMLButtonElement
plan_toggeler_btn?.addEventListener("click", () => {
    const childElement: Element | null = plan_toggeler_btn.firstElementChild
    const prevSibling: Element | null = plan_toggeler_btn.previousElementSibling
    const nextSibling: Element | null = plan_toggeler_btn.nextElementSibling
    if (childElement?.className === 'left-plan') {
        childElement.className = 'right-plan'
        activeYearlyPlan()
        prevSibling.className = ''
        nextSibling.className = 'active-plan'
    }
    else {
        childElement.className = 'left-plan'
        activeMonthlyPlan()
        prevSibling.className = 'active-plan'
        nextSibling.className = ''
    }
})
const allMonthlyPlans = document.querySelectorAll(".plan-detail-monthly") as NodeListOf<HTMLElement>
const allYearlyPlans = document.querySelectorAll(".plan-detail-yearly") as NodeListOf<HTMLElement>
function activeMonthlyPlan(): void {
    allMonthlyPlans.forEach((plan: HTMLElement) => {
        plan.style.display = 'flex'
    })
    allYearlyPlans.forEach((plan: HTMLElement) => {
        plan.style.display = 'none'
    })
}
function activeYearlyPlan(): void {
    allMonthlyPlans.forEach((plan: HTMLElement) => {
        plan.style.display = 'none'
    })
    allYearlyPlans.forEach((plan: HTMLElement) => {
        plan.style.display = 'flex'
    })
}


const allPlans = document.querySelectorAll(".plan") as NodeListOf<HTMLElement>

allPlans.forEach((plan: HTMLElement) => {
    plan.addEventListener('click', () => {
        allPlans.forEach((plan: HTMLElement) => {
            plan.classList.remove('selected-plan')
        })
        plan.classList.add('selected-plan')
    })
})


const allRadioButtons = document.querySelectorAll(".checkbox-button") as NodeListOf<HTMLElement>

allRadioButtons.forEach((radioButton: HTMLElement) => {
    radioButton.addEventListener("click", () => {
        console.log(radioButton.control);
    })
})


