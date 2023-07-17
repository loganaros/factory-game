var cash;
var disCash;
var elCount;
var mil;
var num;
var cost;
var worker;
var workers;
var time;
var prodCount;
var prodCash;

function setup() {
    num = 0;
    cash = 0;
    elCount = 0;
    mil = 1;
    factor = 60;
    cost = 100;
    workers = [];
    products = [];
    time = 0;
    prodCount = 0;
    prodCash = 0;
    buy();
    //document.cookie = "money=hello";
    //var cook = document.getCookie("money");
    createCanvas(720, 480);
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}

function draw() {
    time += 1;
    if (time <= 4800) {
      upCash();
    } else {
      cash += prodCash;
    }
    background(51);
    noStroke();
    fill(244, 66, 152);
    rect(30, 200, 660, 80, 20);
    noStroke();
    fill(102);
    rect(30, 215, 660, 50);
    textSize(74);
    fill(0, 255, 0);
    text("$", 10, 64);
    textSize(64);
    fill(255);
    text(disCash, 50, 60);
    ellipse(mouseX, mouseY, 48, 48);
    for (var i = 0; i < workers.length; i++) {
        workers[i].show();
    }
    for (var i = 0; i < products.length; i++) {
        if (products[i].pos.x <= 680) {
            products[i].show();
            products[i].update();
        } else {
            prodCash += 10;
        }
    }
    if (time % (100 / workers.length) == 0) {
        upProd();
        prodCount += 1;
    }
    if (time > 4800) {
        console.log(prodCount);
    }
    textSize(72)
    fill(200, 20, 20);
    text("Products:", 10, 430);
    textSize(64);
    fill(255);
    text(products.length, 320, 432);
}

function buy() {
  for (var i = 0; i <= elCount; i++) {
    console.log("i: " + i);
    if (workers.length <= 8) {
      workers[elCount] = new Worker((i + 1) * 75, 175, i);
    } else if (workers.length > 8 && workers.length < 16) {
      workers[elCount] = new Worker((elCount - 7) * 75, 325, i);
    } else {
      console.log("No more room");
    }
  }
  worker = workers[workers.length-1];
  num += worker.speed;
}

function upCash() {
    cash += num / 100;
    disCash = abbrNum(cash, 2);
}

function upProd() {
    //for (var i = 0; i <= products.length; i++) {
    //  products[i] = new Product(random(50, 100), random(50, 100), 50, 210);
    //  console.log(products[i]);
    //}
    products[prodCount] = new Product(random(25, 50), random(25, 50), 50, 220);
}

function mouseClicked() {
    factor = factor * .5;
    upProd();
}
function keyPressed() {
  if (keyCode == UP_ARROW) {
    var cookievalue = cash + ";";
    document.cookie = "money=" + cookievalue + "expires=Fri, 7 Apr 2017 20:47:11 UTC;" + "path=/;";
    var cook = document.cookie;
    alert(cook);
  } else if (keyCode == 66) {
    buy();
    cash -= cost;
    elCount += 1;
    factor = factor / workers.length;
  } return false; // prevent default
}
