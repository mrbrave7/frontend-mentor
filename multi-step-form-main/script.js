var plan_toggeler_btn = document.querySelector(".toggle-plan-btn");
plan_toggeler_btn === null || plan_toggeler_btn === void 0 ? void 0 : plan_toggeler_btn.addEventListener("click", function () {
    var childElement = plan_toggeler_btn.firstElementChild;
    var prevSibling = plan_toggeler_btn.previousElementSibling;
    var nextSibling = plan_toggeler_btn.nextElementSibling;
    if ((childElement === null || childElement === void 0 ? void 0 : childElement.className) === 'left-plan') {
        childElement.className = 'right-plan';
        activeYearlyPlan();
        prevSibling.className = '';
        nextSibling.className = 'active-plan';
    }
    else {
        childElement.className = 'left-plan';
        activeMonthlyPlan();
        prevSibling.className = 'active-plan';
        nextSibling.className = '';
    }
});
var allMonthlyPlans = document.querySelectorAll(".plan-detail-monthly");
var allYearlyPlans = document.querySelectorAll(".plan-detail-yearly");
function activeMonthlyPlan() {
    allMonthlyPlans.forEach(function (plan) {
        plan.style.display = 'flex';
    });
    allYearlyPlans.forEach(function (plan) {
        plan.style.display = 'none';
    });
}
function activeYearlyPlan() {
    allMonthlyPlans.forEach(function (plan) {
        plan.style.display = 'none';
    });
    allYearlyPlans.forEach(function (plan) {
        plan.style.display = 'flex';
    });
}
var allPlans = document.querySelectorAll(".plan");
allPlans.forEach(function (plan) {
    plan.addEventListener('click', function () {
        allPlans.forEach(function (plan) {
            plan.classList.remove('selected-plan');
        });
        plan.classList.add('selected-plan');
    });
});
var allRadioButtons = document.querySelectorAll(".checkbox-button");
allRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("click", function () {
        console.log(radioButton.control);
    });
});
