const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropDowns = document.querySelectorAll(".dropdown select");
// console.log(dropDowns);
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns){
  for (let currCode in countryList){
    // console.log(currCode);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener('change',(e)=>{
    updateFlag(e.target);     
  })
}

const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener('click', async(e)=>{
  // console.log(e.target);
  e.preventDefault(e)

  let amount = document.querySelector('.amount input');
  let amtVal = amount.value;
  // console.log(amtVal);
  if (amtVal === "" || amtVal < 1){
   alert("Please Enter Amount")
  }

  // console.log(fromCurr.value, toCurr.value);
  
  const URL =`${BASE_URL}/${fromCurr.value}`;

  let response = await fetch(URL);
  // console.log(response);
  
  let data = await response.json();
  // console.log(data);

  let rate = data.rates[toCurr.value]
  // console.log(rate);

  let finalAmount = amtVal*rate;

  msg.innerText = `Result: ${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  
});