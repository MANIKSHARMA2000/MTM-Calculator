
let stocknameEl = document.getElementById("ul-el")
let priceEl = document.getElementById("price-el")
let qtyEl = document.getElementById("qty-el")
let mtmEl = document.getElementById("profit-loss")
let calEl = document.getElementById("cal-el")
let myinputEl = document.getElementById("myinput-el")
let listitemEl = document.getElementById("listitem")
let stockEl = document.getElementById("stockname-el")
let listboxEl = document.getElementById("listbox")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3da147d207msh81549da6e4e8910p10a44ajsn1bcc5dcf03bb',
		'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
	}
}
//fetch data
fetch('https://latest-stock-price.p.rapidapi.com/any', options)
.then(response => response.json())
.then(data => {console.log(data);//log data
let optnames = ''
let ltp
let name
let findnametoprice
let rr

name = data.map(data =>data.symbol)
ltp = data.map(data =>data.lastPrice)
 //render stock name list
    myinputEl.addEventListener("click",()=>{for(let i=0; i<800; i++){
        optnames = optnames + `<li id="listitem">${name[i]}</li>`;
    }
    stocknameEl.innerHTML = optnames})
    // erase on mouseleave
    listboxEl.addEventListener("mouseleave",()=>{
        stocknameEl.innerHTML = ''
    })   
    //listitem click
    stocknameEl.addEventListener("click",(e)=>{
        rr = e.path[0].innerHTML
        stockEl.innerHTML =  e.path[0].innerHTML
       
    })   
 //cal mtm
calEl.addEventListener("click", function(){
    stockEl.innerHTML = ''
    for(let i=0; i<800; i++){
        if (name[i] === rr)
        {findnametoprice = ltp[i]}
    }
        if(((priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)) > 0){
            mtmEl.innerHTML = `MTM IS <span style="color: green;"> + ${(priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)}</span>`
        }
        else{
            mtmEl.innerHTML = `MTM IS <span style="color: red;">  ${(priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)}</span>`
        }
})

}).catch(()=>{console.log("error caught")})


function filterfunction(){
    let filter = myinputEl.value.toUpperCase();
    let ul = stocknameEl
    let li = ul.getElementsByTagName("li")
    for(let i=0; i<800; i++){
        let a = stocknameEl.getElementsByTagName('li')[i]
        if(a){
            let txtvalue = a.textContent || a.innerHTML
           if(txtvalue.indexOf(filter) > -1){
            li[i].style.display = "";
           }else{
            li[i].style.display = "none";
           }
        }
    }
}



