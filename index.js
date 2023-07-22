const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const doubleMoney = document.getElementById('double-money')
const showMilionaries = document.getElementById('show-milionaires')
const sort = document.getElementById('sort')
const CalculateWealth = document.getElementById('Calculate-wealth')




getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()
let data = []
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/')
  const data = await res.json()

  const user = data.results[0]
  console.log(user)
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    salary: Math.floor(Math.random() * 100000),
  }

  addData(newUser)
}

function addData(input){
console.log(data)
  data.push(input)
  updateDOMdata()
}



//update dom data

function updateDOMdata(providedData=data){
 main.innerHTML='<h2><strong>Person</strong>Wealth</h2>'

 console.log(providedData)
 providedData.forEach((item)=>{
  const element=document.createElement('div')
  element.classList.add('person');
  element.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.salary)}`;
  main.appendChild(element)
 })

 
  
  
 

}

console.log(data)


//formatmoney


function formatMoney(amount, currency = "$", decimalCount = 2, decimalSeparator = ".", thousandsSeparator = ",") {
  try {
    // Check if the input is a valid number
    if (typeof amount !== "number") {
      throw new Error("Invalid input. Amount must be a number.");
    }

    // Convert the number to a fixed decimal count
    const fixedAmount = amount.toFixed(decimalCount);

    // Split the whole and decimal parts
    const parts = fixedAmount.split(".");
    let wholePart = parts[0];
    let decimalPart = parts[1];

    // Add thousands separators to the whole part
    wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // Create the formatted money string
    let formattedMoney = `${wholePart}${decimalSeparator}${decimalPart}`;

    // Add currency symbol
    formattedMoney = `${currency} ${formattedMoney}`;

    return formattedMoney;
  } catch (error) {
    console.error(error.message);
    return "N/A";
  }
}


//add the new user

addUser.addEventListener('click',getRandomUser)

//double money

function doubleMoneyFn(){
 data=[...data].map((item)=>{
  return {
    ...item,
    salary:item.salary*2
  }
  
})
console.log(data)
updateDOMdata()
}


doubleMoney.addEventListener('click',doubleMoneyFn)



//show only milionaries

function onlyMilionaires(){
 data= data.filter((item)=>item.salary>= 1000000)
 updateDOMdata()
}



showMilionaries.addEventListener('click',onlyMilionaires)



//sort by richest

function sortTheRichest(){
  data=data.sort((item1,item2)=>item2.salary-item1.salary  )
  updateDOMdata()
}

sort.addEventListener('click',sortTheRichest)


//calculate entire wealth

function totalWealth(){
  const wealth=data.reduce((a,b)=>a=a+b.salary,0)
  const res=formatMoney(wealth)
  console.log(res)
const wealthEl=document.createElement('div')
wealthEl.innerHTML=`<h3>Total Wealth :<strong>${res}</strong></h3> `
main.appendChild(wealthEl)
}

CalculateWealth.addEventListener('click',totalWealth)