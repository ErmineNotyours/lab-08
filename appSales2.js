'use strict';
//console.log('Top of script.');
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
//Need to: put store info into arrays, so they can be expanded (pushed to) by forms.
var storeName = ['First and Pike','SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var minCustPerHourArr = [23, 3, 11, 20, 2];
var maxCustPerHourArr = [65, 24, 38, 38, 16];
var avgCookeSoldPerHourArr = [6.3, 1.2, 3.7, 2.3, 4.6];
var yTotal = [];
for (var i = 0; i < hours.length; i++) {
  yTotal.push(0);
}

// get the reference for the body
var body = document.getElementsByTagName('body')[0];

// creates a <table> element and a <tbody> element
var tbl = document.createElement('table');
var tblBody = document.createElement('tbody');

function Store (name, minCustPerHour, maxCustPerHour, avgCookeSoldPerHour, calcRandCustByHour) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookeSoldPerHour = avgCookeSoldPerHour;
  this.randCustByHour = [];
  this.cookiesSoldByHour = [];
  this.totalCookies = 0;
  this.calcRandCustByHour = function() {
    for(var i = 0; i < hours.length; i++){
      this.randCustByHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
      console.log(hours.length + ' ' + i + ' ' + this.randCustByHour[i]);
    }
  };
  this.calcCookiesSoldByHour = function() {
    for(var j = 0; j < hours.length; j++) {
      this.cookiesSoldByHour.push(Math.floor(this.avgCookeSoldPerHour * this.randCustByHour[j]));
      console.log('j, this.randCustByHour, this.avgCookeSoldPerHour, this.cookiesSoldByHour: ' + j + ' ' + this.randCustByHour[j] + ' ' + this.avgCookeSoldPerHour + ' ' + this.cookiesSoldByHour[j]);
    }
  };
  this.render = function() {
    var tblBody = document.getElementById('t');
    console.log('tblBody ', tblBody);
    var row = document.createElement('tr');
    var tdEl = document.createElement('th');
    tdEl.textContent = this.name;
    row.appendChild(tdEl);
    //console.log('Appended left header, about to enter calcCookiesSoldByHour');
    this.calcRandCustByHour();
    this.calcCookiesSoldByHour();
    var xTotal = 0;
    for(var k = 0; k < hours.length; k++){
      var salesTd = document.createElement('td');
      salesTd.textContent = this.cookiesSoldByHour[k];
      xTotal = xTotal + this.cookiesSoldByHour[k];
      yTotal[k] = yTotal[k] + this.cookiesSoldByHour[k];
      row.appendChild(salesTd);
    }
    //Add row total here
    var salesTd = document.createElement('th');
    salesTd.textContent = xTotal;
    row.appendChild(salesTd);

    tblBody.appendChild(row);

  };
};

//Write top row hour headers
var tblBody = document.getElementById('t');
var row = document.createElement('tr');

var emptyH = document.createElement('th');
row.appendChild(emptyH);
for(var l = 0; l < hours.length; l++){
  var tdEl = document.createElement('th');
  console.log('l, hours[l]', l, hours[l]);
  tdEl.textContent = hours[l];
  row.appendChild(tdEl);
  //console.log('hoursTd', hoursTd);
}
tblBody.appendChild(row);
console.log('row = ', row);

//New code for accessing object by arrays. Needed for flexibility for adding stores by form
function updateStore(){
  for (var loc = 0; loc < storeName.length; loc++){
    console.log('In the for location loop, location ', location);
    var calcStore = new Store(storeName[loc], minCustPerHourArr[loc], maxCustPerHourArr[loc], avgCookeSoldPerHourArr[loc]);
    calcStore.render();
  }
}
updateStore();
// old constructor function calls
// var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
// firstAndPike.render();
//
// var seaTacAirport = new Store('SeaTac Airport', 3, 24, 1.2);
// seaTacAirport.render();
//
// var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
// seattleCenter.render();
//
// var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
// capitolHill.render();
//
// var alKi = new Store('Alki', 2, 16, 4.6);
// alKi.render();

//Column total row here
var grandTotal = 0;
var tblBody = document.getElementById('t');
var row = document.createElement('tr');

var emptyH = document.createElement('th');
row.appendChild(emptyH);
for(var l = 0; l < hours.length; l++){
  var tdEl = document.createElement('th');
  console.log('l, yTotal[l]', l, yTotal[l]);
  grandTotal = grandTotal + yTotal[l];
  tdEl.textContent = yTotal[l];
  row.appendChild(tdEl);
  //console.log('hoursTd', hoursTd);
}
var tdEl = document.createElement('th');
tdEl.textContent = grandTotal;
row.appendChild(tdEl);

tblBody.appendChild(row);
console.log('row = ', row);

//Forms!
var addStore = document.getElementById('add-store');

function handleNewStoreSubmit(event){

  event.preventDefault();
  if (!event.target.storename.value || event.target.mincust.value || event.target.maxcust.value || event.target.avgcook.value){
    return alert('Cat got your tounge?  Fields can not be left empty.');
  }

  storeName.push(event.target.storename.value);
  minCustPerHourArr.push(parseInt(event.target.mincust.value)); maxCustPerHourArr.push(parseInt(event.target.maxcust.value)); avgCookeSoldPerHourArr.push(parseInt(event.target.avgcook.value));
  updateStore();

  event.target.storename.value = null;
  event.target.mincust.value = null;
  event.target.maxcust.value = null;
  event.target.avgcook.value = null;

}

chatForm.addEventListener('submit', handleNewStoreSubmit);
