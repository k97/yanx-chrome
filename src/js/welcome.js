
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const adjectives = [
    "an awesome",
    "an incredible",
    "a thoughtful",
    "a dashing",
    "an amazing"
];

let date = new Date();
let today = date.getDate() + ' ' + months[date.getMonth()];
var message = adjectives[date.getDay() % adjectives.length];

document.getElementById('yx-date').innerHTML = today;
document.getElementById('yx-adjectives').innerHTML = message;