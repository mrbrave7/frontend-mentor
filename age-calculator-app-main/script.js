const month = document.getElementById('month');
const button = document.querySelector('button');
const yearInput = document.getElementById('year');
const yearError = document.getElementById('yearErrorMsg');
const yearLabel = document.querySelector('.year label');
const years = document.querySelector('.years');
const monthInput = document.getElementById('month');
const monthError = document.getElementById('monthErrorMsg')
const monthLabel = document.querySelector(".month label")
const months = document.querySelector('.months');
const daysInput = document.getElementById('days');
const daysError = document.getElementById('dayErrorMsg')
const daysLabel = document.querySelector(".days label")
const days = document.querySelector('.day');
button.addEventListener('click', () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()
    let birthYear = currentYear - yearInput.value;
    let birthMonth = currentMonth - monthInput.value
    let birthDate = currentDay - daysInput.value
    const monthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (yearInput.value === '' && monthInput.value === '' && daysInput.value === '') {
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
        yearError.textContent = "This Field Is Required";
        yearLabel.style.color = 'hsl(0, 100%, 67%)';
        years.innerText = '--'
        monthError.textContent = "This Field Is Required";
        monthLabel.style.color = 'hsl(0, 100%, 67%)'
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)'
        months.innerText = "--"
        daysLabel.style.color = 'hsl(0, 100%, 67%)'
        daysInput.style.borderColor = 'hsl(0, 100%, 67%)'
        daysError.textContent = "This Field Is Required";
        days.innerText = '--'
    }

    if (yearInput.value > 2024) {
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
        yearError.textContent = "Must Be In The Past";
        yearLabel.style.color = 'hsl(0, 100%, 67%)';
        years.innerText = '--'
    }
    if (yearInput.value < 0) {
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
        yearError.textContent = "Must Be A Valid Year";
        yearLabel.style.color = 'hsl(0, 100%, 67%)';
        years.innerText = '--'
    }
    else {
        yearInput.style.borderColor = 'hsl(0, 1%, 44%)';
        yearError.textContent = " ";
        yearLabel.style.color = 'hsl(0, 1%, 44%)';
    }
    isLeapYear(yearInput.value)
    function isLeapYear(year) {
        if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
            monthsArray[1] = 29;
        } else {
            monthsArray[1] = 28;
        }
    }
    if (monthInput.value <= 0 || monthInput.value > 12) {
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthError.textContent = "Must Be A Valid Month";
        monthLabel.style.color = 'hsl(0, 100%, 67%)';
        months.innerText = '--'
    }
    else {
        monthInput.style.borderColor = 'hsl(0, 1%, 44%)';
        monthError.textContent = " ";
        monthLabel.style.color = 'hsl(0, 1%, 44%)';
        if (currentMonth >= monthInput.value) {
            birthMonth = currentMonth - monthInput.value
        }
        else {
            birthYear = birthYear - 1
            birthMonth = 12 + currentMonth - monthInput.value
        }
        if (daysInput.value <= 0 || daysInput.value > monthsArray[monthInput.value - 1] || daysInput.value > currentDay) {
            daysInput.style.borderColor = 'hsl(0, 100%, 67%)';
            daysError.textContent = "Must Be A Valid Month";
            daysLabel.style.color = 'hsl(0, 100%, 67%)';
            days.innerText = '--'
            months.innerText = '--'
            years.innerText = '--'
        } else {
            daysInput.style.borderColor = 'hsl(0, 1%, 44%)';
            daysError.textContent = "";
            daysLabel.style.color = 'hsl(0, 1%, 44%)';
            if (currentDay >= daysInput.value) {
                birthDate = currentDay - daysInput.value
            } else {
                birthMonth = birthMonth - 1
                let monthDays = monthsArray[currentMonth - 2]
                birthDate = monthDays + currentDay - daysInput.value
                if (birthMonth < 0) {
                    birthMonth = 11
                    birthYear = birthYear - 1
                }
            }
            if (birthMonth > currentMonth) {
                monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
                monthError.textContent = "Must Be A Valid Month";
                monthLabel.style.color = 'hsl(0, 100%, 67%)';
                days.innerText = '--'
                months.innerText = '--'
                years.innerText = '--'
            }
            else {
                days.innerText = birthDate
                months.innerText = birthMonth
                years.innerText = birthYear
            }
        }
    }

});
