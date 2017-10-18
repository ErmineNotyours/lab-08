'use strict';
console.log('Top of script.');
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
//Need to: put store info into arrays, so they can be expanded (pushed to) by forms.
var storeName = ['First and Pike','SeaTac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];
var minCustPerHour = [23, 3, 11, 20, 2];
var maxCustPerHour = [65, 24, 38, 38, 16];
var avgCookeSoldPerHour = [6.3, 1.2, 3.7, 2.3, 4.6];

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
    for(var k = 0; k < hours.length; k++){
      var salesTd = document.createElement('td');
      salesTd.textContent = this.cookiesSoldByHour[k];
      row.appendChild(salesTd);
    }
    // Need to add totals, bottom and right side!

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

for (location = 0; location < storeName.length; location++){
  var calcStore = new Store(storeName[location], minCustPerHour[location], maxCustPerHour[location], avgCookeSoldPerHour[location]);
  calcStore.render();
}

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
