
let ulEl = document.getElementById("ul-el")
let priceEl = document.getElementById("price-el")
let qtyEl = document.getElementById("qty-el")
let mtmEl = document.getElementById("profit-loss")
let calEl = document.getElementById("cal-el")
let myinputEl = document.getElementById("myinput-el")
let listitemEl = document.getElementById("listitem")
let selectedstockEl = document.getElementById("selectedstock-el")
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
let matchname
let getprice

name = data.map(data =>data.symbol)
ltp = data.map(data =>data.lastPrice)
 //render stock name list
    myinputEl.addEventListener("click",()=>{for(let i=0; i<data.length; i++){
        optnames = optnames + `<li id="listitem">${name[i]}</li>`;
    }
    ulEl.innerHTML = optnames})
    // erase on mouseleave
    listboxEl.addEventListener("mouseleave",()=>{
        ulEl.innerHTML = ''
    })   
    //listitem click
    ulEl.addEventListener("click",(e)=>{
        ulEl.innerHTML = ''
        myinputEl.value = `${e.path[0].innerHTML}`
        matchname = e.path[0].innerHTML
        selectedstockEl.innerHTML =  e.path[0].innerHTML
        for(let i=0; i<data.length; i++){
            if (name[i] === e.path[0].innerHTML)
            {priceEl.value = ltp[i]}
        }
    })   
 //cal mtm
calEl.addEventListener("click", function(){
    
    for(let i=0; i<data.length; i++){
        if (name[i] === matchname)
        {findnametoprice = ltp[i]}
    }
        if(((priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)) > 0){
            mtmEl.innerHTML = `MTM IS <span style="color: green;"> + ${((priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)).toFixed(2)}</span>`
        }
        else{
            mtmEl.innerHTML = `MTM IS <span style="color: red;">  ${((priceEl.value * qtyEl.value) - (findnametoprice * qtyEl.value)).toFixed(2)}</span>`
        }
        selectedstockEl.innerHTML = ''
        myinputEl.value = ''
        priceEl.value=''
        qtyEl.value=''
})

}).catch(()=>{console.log("error caught")})


function filterfunction(){
    let filter = myinputEl.value.toUpperCase();
    let ul = ulEl
    let li = ul.getElementsByTagName("li")
    for(let i=0; i<800; i++){
        let a = ulEl.getElementsByTagName('li')[i]
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



