const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownSelects = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurrency = document.querySelector('.from select')
const toCurrency = document.querySelector('.to select');
const message = document.querySelector('.message');

for (let select of dropdownSelects) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "Selected";
      } else if (select.name === "to" && currCode === "PKR") {
        newOption.selected = "Selected";
      }
    select.append(newOption);
    
  }
  

//   select.addEventListener('change', (ev) =>{
//     updateFlag(ev.target);
//   });

select.addEventListener('change', (event)=>{
    updateFlag(event.target)
});
}

const updateFlag = (element) =>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

window.addEventListener('load', ()=>{
    updateExchangeRate();
})


btn.addEventListener('click', async (event)=>{
    event.preventDefault();
    updateExchangeRate();    

    // /USD_EUR.json
});

const updateExchangeRate = async()=>{
    let amount = document.querySelector('.amount input');
    let amountValue = amount.value;
    if (amountValue == '' || amountValue < 1){
        amount.value = 1;
        amountValue = 1;
    }
    // console.log(fromCurrency.value.toLowerCase(), toCurrency.value.toLowerCase());
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount = Math.round((amountValue * rate) * 100) / 100; 
    message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`
    console.log(rate);
}