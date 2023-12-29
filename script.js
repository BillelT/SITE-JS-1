// Declare all global variables

const mouseCircle = document.getElementById("mouse")
calcContainer = document.getElementById('calc-container')
resContainer = document.getElementById('res-container')
calcKey = document.querySelectorAll('td')
calc = document.querySelector("table")
resultat = document.getElementById("spanres")
operators = ["+", "-", "/", "*"];

let total = "0";


// Declare function for calculator


calc.addEventListener("mousedown", function chiffres(e) {
  const target = e.target.innerHTML;
  let lastCar = total.slice(-1);
  if (target != "AC" && target != "C" && target != "=") {
    if (total === "0" && target != ".") {
      total = "";
    }
    if (total === "-0") {
      total = "-";
    }
    if (lastCar === "." && target === ".") {
      total = total.slice(0, -1);
    }
    operators.forEach((operator) => {
      if (lastCar === operator && operators.includes(target)) {
        total = total.slice(0, -1);
      }
    });
    total += target;
    if (total[0] != "-" && operators.includes(total[0])) {
      total = "0";
    }
  } else if (target === "C") {
    total = total.slice(0, -1);
    if (total == 0) {
      total = "0";
    }
  } else if (target == "AC") {
    total = "0";
  } else if (target === "=") {
    total = eval(total);
    total = total.toString();
  }
  resultat.innerHTML = total;
});


// MOUSE CIRCLE

window.addEventListener("mousemove", (e) => {
  mouseCircle.style.left = e.pageX + "px";
  mouseCircle.style.top = e.pageY + "px";
  if (e.target == resultat || e.target == resContainer || Array.from(calcKey).includes(e.target)) {
    mouseCircle.style.opacity = "0";
  } else {
    mouseCircle.style.opacity = "1";
  }
});

// *************************************** TESTING THINGS *************************************************

// function add(x) {
//   total += x;
//   return total;
// }
// function subs(x) {
//   total -= x;
//   return total;
// }
// function div(x) {
//   if (x === 0) {
//     total = "ERROR";
//   } else {
//     total /= x;
//     return total;
//   }
// }
// function mult(x) {
//   total *= x;
//   return total;
// }