let cagrEl = document.getElementById("CAGR");
let intrinsicValEl = document.getElementById("intrinsic-val");
let discountPercEl = document.getElementById("discount-perc");
let headingEl = document.getElementById("heading");

let demoEl = document.getElementById("demo");
let stockNameEl = document.getElementById("stock-name");
let sharesEl = document.getElementById("no-of-shares");
let currPriceEl = document.getElementById("current-price");
let earningsEl = document.getElementsByName("earning"); //array containing all the earning values
function calculate() {
  let stockName = stockNameEl.value;
  let shares = sharesEl.value;
  let currPrice = currPriceEl.value;
  let earnings = [];
  for (let i = 0; i < earningsEl.length; i++) {
    earnings.push(earningsEl[i].value);
  }
  let cagr = calculateCAGR(earnings);
  let year = 10,
    bondRate = 0.072;
  let intrinsicVal = getIntrinsicVal(
    shares,
    currPrice,
    earnings[earnings.length - 1],
    cagr,
    year,
    bondRate
  );
  let discountPerc = getDiscountPerc(intrinsicVal, currPrice);

  headingEl.textContent = stockName;
  cagrEl.textContent = cagr;
  intrinsicValEl.textContent = intrinsicVal;
  discountPercEl.textContent = discountPerc;
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
