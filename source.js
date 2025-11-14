let dragName;
let dragPrice ;
let totalPrice =0;
let db ={}
let open =true
function windowpopup(i, listelement){
 //   document.getElementById('main').className="temp"
    open = false
    console.log("clicked");
    const popup = document.createElement('div');
  //   popup.innerHTML="table"+(i+1) +"<br/>";
    const closepop = document.createElement('div');
    const genrateBill =  document.createElement('div');
    const tbl = document.createElement('table');
    const tablerow =document.createElement('tr');
    const tableHeadName = document.createElement('th');
    const tableHeadPrice = document.createElement('th');
    const tableHeadQuantity = document.createElement('th');
    const tableHeadNetPrice =document.createElement("th");
    const  tableHeadRemove = document.createElement("th");
    tableHeadName.textContent="Name";
    tableHeadPrice.textContent="Price";
    tableHeadQuantity.textContent="Quantity";
    tableHeadNetPrice.textContent="Net Price";
    tableHeadRemove.textContent="remove";
    tablerow.appendChild(tableHeadName);
    tablerow.appendChild(tableHeadPrice);
    tablerow.appendChild(tableHeadQuantity);
    tablerow.appendChild(tableHeadNetPrice);
    tablerow.appendChild(tableHeadRemove);
    tbl.appendChild(tablerow);
    popup.className="popclass";
    closepop.className="ClosePopup";
    genrateBill.className="generateBill";
   genrateBill.textContent="Genrate Bill";
   genrateBill.addEventListener("click",()=>{
    window.alert("please pay your bill of  "+getTotalPrice(i));
        popup.removeChild(tbl)
         popup.innerHTML="";
          popup.className="";
          db[i]=null;
          listelement.innerHTML=" Total Price "+0 +"$";
        open= true;
        })
    closepop.innerHTML="x";
    closepop.addEventListener("click" ,(e)=>{
       open =true
         popup.innerHTML="";
          popup.className="";
      // popup.innerHTML="";
    })
    db[i].forEach(elementA =>{
       const tablerowA = document.createElement('tr');
       const tableDataName = document.createElement('td');
       const tableDataPrice = document.createElement('td');
       const tableQuantity = document.createElement('td');
       const tableDataNetPrice =document.createElement('td');
       const tableDataQuantity = document.createElement('td');
       const tableDataQuantityTable = document.createElement('td');
       const Quantityplus = document.createElement('td');
       const QuantityMinus = document.createElement('td');
        const QuantityRemove = document.createElement('td');
       Quantityplus.textContent ="+";
       Quantityplus.addEventListener("click",()=>{
        elementA.quantity+=1;
        tableDataQuantity.textContent = elementA.quantity;
         listelement.innerHTML=" Total Price "+getTotalPrice(i) +"$";
           tableDataNetPrice.textContent=elementA.quantity*elementA.price;
        render();
     
         
       })
       Quantityplus.className="plus";
       QuantityMinus.textContent="-";
       QuantityMinus.className="minus"
       QuantityMinus.addEventListener("click",()=>{
        if(elementA.quantity==1){

        }else{
            elementA.quantity+=-1;
            tableDataQuantity.textContent = elementA.quantity;
         listelement.innerHTML=" Total Price "+getTotalPrice(i) +"$";
           tableDataNetPrice.textContent=elementA.quantity*elementA.price;
        render();
        }
       })
       QuantityRemove.textContent="🗑";
       QuantityRemove.className="remove";
       QuantityRemove.addEventListener("click", ()=>{
    //    console.log('aj');
       elementA.quantity=0;
         listelement.innerHTML=" Total Price "+getTotalPrice(i) +"$";
         console.log(getTotalPrice(i));
           tbl.removeChild(tablerowA);
         render();
        
       }
       )
      if(elementA.quantity!=0){
       tableDataName.textContent=elementA.name;
       tableDataPrice.textContent=elementA.price;
       tableDataQuantity.textContent=elementA.quantity;
       tableDataNetPrice.textContent=elementA.quantity*elementA.price;
        tableDataQuantityTable.appendChild(QuantityMinus);
        tableDataQuantityTable.appendChild(tableDataQuantity);
       tableDataQuantityTable.appendChild(Quantityplus);
       tableQuantity.appendChild(tableDataQuantityTable);
       tablerowA.appendChild(tableDataName);
       tablerowA.appendChild(tableDataPrice);
       tablerowA.appendChild(tableQuantity);
       tablerowA.appendChild(tableDataNetPrice);
       tablerowA.appendChild(QuantityRemove);
       tbl.appendChild(tablerowA);
       }

    })
function render(){
    popup.innerHTML= "Table"+(i+1) +"<br/>"+"Total Price "+getTotalPrice(i);
    popup.appendChild(closepop);
    popup.appendChild(tbl);
    popup.appendChild(genrateBill);
}
render();
    document.getElementById("main").appendChild(popup);
}
function dragstartHandler(ev, itemname, itemprice){
    dragName=itemname;
  dragPrice=itemprice;
   console.log('draging   .......');
}

function dragoverHandler(ev){
    ev.preventDefault();
    console.log('dropping');

}
function addItemToTable(tableKey, foodObject){
    const items =[];
    items.push(foodObject)
    db[tableKey] = items;
}
function getTotalPrice(i){
    let sum =0;
db[i].forEach(element => {
  {
        sum += element.price*element.quantity;
    }
});
console.log(sum)
 return sum ;

}
function dropHandler(ev, i, listelement){
    const tableKey = i;
   if(db[tableKey])
   {
     var flag =false;
    db[tableKey].forEach(elementT => {
        if(elementT.name==dragName){
           elementT.quantity+=1;
           flag =true;
        }
    });
    if(flag == false){

    db[tableKey].push({
        name:dragName,
        price:dragPrice,
        quantity :1
    })

    }
     
  
   }else{
    db[tableKey]=[];
    db[tableKey].push({
        name:dragName,
        price:dragPrice,
        quantity :1
    })
   }
   console.log(typeof(dragPrice))
    totalPrice=getTotalPrice(i);
 
    listelement.innerHTML=" Total Price "+getTotalPrice(i) +"$";
}
let N=9
let tables = [];
let tableList =[];
for(let i =1;i<=N;i++){
    const element = document.createElement('div');
    element.innerHTML="table"+i;
    element.className="table";
    let listelement = document.createElement('div');
    listelement.className="addelements";
    listelement.innerHTML="";

   element.addEventListener("dragover",(e)=>{ dragoverHandler(e)});
    element.addEventListener("drop", (e)=>{
        console.log("HEY DRAG ME ")
        if(open == true){
        dropHandler(e,i-1,listelement)
        }
    });
    element.addEventListener("click",(e)=>{
        if(open== true){
        windowpopup(i-1,listelement);
        }
    })
    tables.push(element);
    tableList.push(listelement);
    element.appendChild(listelement)
    document.getElementById("tables").appendChild(element);
  //  document.getElementById('tables').appendChild(listelement)
}
// document.getElementById("tables").append(tables)


let m =9;
let foods =[];
let menus =[
    {
       'item':'waterBottle',
       'item_price':20,
    },{
        'item':"chiken",
        'item_price':120
    },
    {
        'item' :'mutton',
        'item_price':180
    },
    {
        'item':'chiken biryani',
        'item_price':150
    },{
        'item':' special chiken biryani',
        'item_price':170
    },
    {'item':'mutton biryani',
        'item_price':200
    },
    {
        'item':'water Bottle',
        'item_price':20
    },{
        'item': 'Coke',
        'item_price':40
    }

]
for(let key of menus){
    const element2= document.createElement('div');
    element2.style.display
 //   element2.innerHTML =key.item //+" "+key.item_price;
    element2.className ="food";
    const foodnameElement = document.createElement('div');
    foodnameElement.innerHTML=key.item;
    foodnameElement.className="name"
    element2.appendChild(foodnameElement);
    const foodprice = document.createElement('div');
    foodprice.innerHTML =key.item_price +"$";
    foodprice.className="price";
    element2.appendChild(foodprice);
    foods.push(element2);
    document.getElementById("foods").appendChild(element2)
   element2.draggable=true;
    element2.addEventListener("dragstart" ,(e)=>{dragstartHandler(e, key.item, key.item_price)})
    // element2.addEventListener("drop", (e)=>{dropHandler(e)});
}



function MyFunction(){
   // foods[i].style.display = originalDisplay;
    let input = document.getElementById('MyId').value;
    console.log("INPUT ", input)
    input = input.toLowerCase();
    for(let i =0; i<foods.length; i++){

        // console.log(foods[i])
        let temp = foods[i].querySelector(".name");
   
        console.log(temp.innerHTML);
     //      console.log(temp.innerHTML);
       if(!temp.innerHTML.toLowerCase().includes(input)){
            foods[i].style.display = 'none';
            console.log("yes");
        }else{
            foods[i].style.display="";
        }
       
    }
    
};
function MyFunctionT(){
    let search = document.getElementById('MyId1').value;
    let dispalyD = document.getElementById('tables');
    search= search.toLowerCase();
 for(let i=0;i<tables.length; i++){
    console.log(i);
    if(!tables[i].innerHTML.toLowerCase().includes(search)){
        console.log('yes');
    tables[i].style.display= 'none';
    }else{
        tables[i].style.display="";
    }
 }
}




