
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
    "an amazing",
    "a serene",
    "a thoughtful",
    "a dashing"
];

let date = new Date();
let today = date.getDate() + ' ' + months[date.getMonth()];
let adjectiveVal = adjectives[Math.floor(Math.random() * adjectives.length)];

document.getElementById('yx-date').innerHTML = today;
document.getElementById('yx-adjectives').innerHTML = adjectiveVal;