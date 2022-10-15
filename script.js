let outputDataEl = document.getElementById("output-data");
let cagrEl = document.getElementById("CAGR");
let intrinsicValEl = document.getElementById("intrinsic-val");
let discountPercEl = document.getElementById("discount-perc");
let headingEl = document.getElementById("heading");

let demoEl = document.getElementById("demo");
let stockNameEl = document.getElementById("stock-name");
let sharesEl = document.getElementById("no-of-shares");
let currPriceEl = document.getElementById("current-price");
let earningsEl = document.getElementsByName("earning"); //array containing all the earning values

function unhideElements(hiddenEle) {
  let n = hiddenEle.length;
  for (let i = 0; i < n; i++) {
    hiddenEle[i].style.display = "block";
  }
}

function calculate() {
  outputDataEl.style.display = "block";
  let hiddenEle = document.getElementsByClassName("hide-initial");
  unhideElements(hiddenEle);
  document.getElementById("welcome-msg").style.display = "none";

  let stockName = stockNameEl.value;
  let shares = sharesEl.value;
  let currPrice = currPriceEl.value;
  let earnings = [];
  for (let i = 0; i < earningsEl.length; i++) {
    earnings.push(earningsEl[i].value);
  }
  let cagr = calculateCAGR(earnings);
  let year = 10,
    bondRate = 0.07446;
  let intrinsicVal = getIntrinsicVal(
    shares,
    currPrice,
    earnings[earnings.length - 1],
    cagr,
    year,
    bondRate
  );

  headingEl.textContent = stockName;
  cagrEl.textContent = "CAGR (last 5 years): " + (100 * cagr).toFixed(2) + "%";
  intrinsicValEl.textContent =
    "Value (after 10 years): ₹" + intrinsicVal.toFixed(2);

  let tagEl = document.getElementById("tag");
  tagEl.style.opacity = "1";

  let discountPerc = getDiscountPerc(intrinsicVal, currPrice);
  if (discountPerc < 0) {
    tagEl.textContent = "OVERPRICED";
    tagEl.style.backgroundColor = "#FF0033";
    tagEl.style.color = "white";
    discountPercEl.textContent =
      "Surge: " + Math.abs(100 * discountPerc).toFixed(2) + "%";
  } else {
    tagEl.textContent = "UNDERPRICED";
    tagEl.style.backgroundColor = "#00ff66";
    tagEl.style.color = "black";
    discountPercEl.textContent =
      "Discount: " + Math.abs(100 * discountPerc).toFixed(2) + "%";
  }
}

function calculateCAGR(arr) {
  let res = Math.pow(arr[arr.length - 1] / arr[0], 1 / arr.length) - 1;
  return res;
}

function getIntrinsicVal(shares, currPrice, currEarning, cagr, year, bondRate) {
  let val = 0;
  val = (currEarning * Math.pow(1 + cagr, year)) / (bondRate * shares);
  return val;
}
function getDiscountPerc(intrinsicVal, currPrice) {
  return (intrinsicVal - currPrice) / currPrice;
}
