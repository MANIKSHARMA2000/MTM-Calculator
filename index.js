
let stocknameEl = document.getElementById("stockname-el")
let priceEl = document.getElementById("price-el")
let qtyEl = document.getElementById("qty-el")
let mtmEl = document.getElementById("profit-loss")
let calEl = document.getElementById("cal-el")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3da147d207msh81549da6e4e8910p10a44ajsn1bcc5dcf03bb',
		'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
	}
}

fetch('https://latest-stock-price.p.rapidapi.com/any', options)
.then(response => response.json())
.then(data => {console.log(data);//log data
let optnames
let ltp
let name
let findnametoprice

name = data.map(data =>data.symbol)
ltp = data.map(data =>data.lastPrice)
 //render stock name list    
for(let i=1; i<800; i++){
    optnames = optnames + `<option value="">${name[i]}</option>`;


}
stocknameEl.innerHTML = optnames


 //cal mtm
calEl.addEventListener("click", function(){
    for(let i=0; i<900; i++){
        if (name[i] === stocknameEl.options[stocknameEl.selectedIndex].text)
        {findnametoprice = ltp[i]}
    }
        if(((priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)) > 0){
            mtmEl.innerHTML = `MTM IS <span style="color: green;"> + ${(priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)}</span>`
        }
        else{
            mtmEl.innerHTML = `MTM IS <span style="color: red;">  ${(priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)}</span>`
        }
    

})
})
















