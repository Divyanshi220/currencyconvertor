const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.text = currCode;
    if (select.name === "from" && currCode === "USD") {
        option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
        option.selected = true;
    }
    select.appendChild(option);
}

select.addEventListener("change", (e) => {
    updateFlag(e.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amtVal = parseFloat(amountInput.value) || 1;
    amountInput.value = amtVal;

const from = fromCurr.value.toLowerCase();
const to = toCurr.value.toLowerCase();

const URL = `${BASE_URL}/${from}.min.json`;
try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    const rate = data[from][to];

    if (!rate) throw new Error("Rate not found");

    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
} catch (err) {
    console.error("Exchange rate fetch error:", err);
    msg.innerText = "Something went wrong. Try again!";
}
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
