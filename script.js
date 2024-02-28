// Declare all global variables

const mouseCircle = document.getElementById("mouse");
calcContainer = document.getElementById("calc-container");
resContainer = document.getElementById("res-container");
calcKey = document.querySelectorAll("td");
clear = document.getElementById("clear");
tableCalcKey = Array.from(calcKey); // turning queryselector into an array of td's elements
calc = document.querySelector("table");
resultat = document.getElementById("spanres");
operators = ["+", "-", "/", "*"]; // mathematic operators array

let resBorderIsBlue = false; // Boolean who become true only if res-container's border is blue
let total = "0"; // initialize total as same value of inner html of spanres
let clickTimer;

// Event listener for change border in fonction of user's selection, increasing UX
window.addEventListener("mousedown", (e) => {
  // event on window, to allow user to unselect the calculator
  if (
    e.target.offsetParent == resContainer ||
    e.target.offsetParent == calc ||
    e.target == resContainer ||
    e.target == calc
  ) {
    resContainer.style.border = "2px solid #81a7da";
    resBorderIsBlue = true;
  } else {
    resContainer.style.border = "2px solid #f1f1f1";
    resBorderIsBlue = false;
  }
});

// event listener for hover on res-container
resContainer.addEventListener("mouseenter", () => {
  resContainer.style.background = "#dedde0c0";
  if (resBorderIsBlue == false) {
    // if res-container's border is blue, it doesnt change until user unselect the calculator
    resContainer.style.border = "none";
  }
});

// event listener for hover on res-container
resContainer.addEventListener("mouseleave", () => {
  resContainer.style.background = "#c0bfc2c0";
  if (resBorderIsBlue == false) {
    // if res-container's border is blue, it doesnt change until user unselect the calculator
    resContainer.style.border = "2px solid white";
  }
});

window.addEventListener("keydown", (e) => {
  let lastCar = total.slice(-1);
  target = e.key;
  // checking if user select calculator and if the key press is a key on the calculator
  for (let i = 0; i < tableCalcKey.length; i++) {
    if (resBorderIsBlue == true && tableCalcKey[i].innerHTML == e.key) {
      if (
        target !== "Backspace" && // key 'C' replace by Backspace, usually use on keyboard to delete
        target !== "Enter" &&
        target !== "=" &&
        target !== ")" &&
        target !== "%"
      ) {
        if (
          total === "0" &&
          target !== "." &&
          target !== "(" &&
          !operators.includes(target)
        ) {
          total = "";
        }
        if ((total === "0" || total === "-") && target === "-") {
          total = "";
        }
        if (lastCar === "." && target === ".") {
          total = total.slice(0, -1);
        }
        if (lastCar === "." && operators.includes(target)) {
          total = total.slice(0, -1);
        }
        operators.forEach((operator) => {
          if (lastCar === operator && operators.includes(target)) {
            total = total.slice(0, -1);
          }
          if (total === "-" && operators.includes(target)) {
            total = "00";
          }
        });
        total += target;
        if (total[0] !== "-" && operators.includes(total[0])) {
          total = "0";
        }
      }
    }
  }
  if (target === "Backspace") {
    total = total.slice(0, -1);
    if (total == 0) {
      total = "0";
    }
  }
  if (target === "Enter" || target === "=") {
    total = eval(total);
    total = total.toString();
  }
  resultat.innerHTML = total;
});

calc.addEventListener("mousedown", (e) => {
  if (e.target.innerHTML === "C") {
    clear.classList.toggle("clicked");
  }
  // set the click duration timer to a function who execute after 800ms
  clickTimer = setTimeout(() => {
    if (e.target.innerHTML === "C") {
      total = "0";
      resultat.innerHTML = total;
    }
  }, 800);
});
calc.addEventListener("mouseleave", () => {
  clear.classList.remove("clicked");
});

calc.addEventListener("mouseup", function chiffres(e) {
  target = e.target.innerHTML;
  let lastCar = total.slice(-1);
  if (
    target !== "C" &&
    target !== "=" &&
    target !== ")" &&
    e.target.childNodes.length < 3 &&
    target !== "%"
  ) {
    if (
      total === "0" &&
      target !== "." &&
      target !== "%" &&
      !operators.includes(target)
    ) {
      total = "";
    }
    if ((total === "0" || total === "-") && target === "-") {
      total = "";
    }
    if (lastCar === "." && target === ".") {
      total = total.slice(0, -1);
    }
    if (lastCar === "." && operators.includes(target)) {
      total = total.slice(0, -1);
    }
    operators.forEach((operator) => {
      if (total != "-" && lastCar === operator && operators.includes(target)) {
        total = total.slice(0, -1);
      }
      if (total === "-" && operators.includes(target)) {
        total = "00";
      }
    });
    total += target;
  } else if (target === "C") {
    // if the user mouseup before 800ms (clickTimer duration) clear the previous action in the timed out function
    clearTimeout(clickTimer);
    clear.classList.toggle("clicked");
    total = total.slice(0, -1);
    if (total == 0) {
      total = "0";
    }
  } else if (target === "=") {
    total = eval(total);
    total = total.toString();
  }
  resultat.innerHTML = total;
});

// create a custom cursor whith event mousemove
window.addEventListener("mousemove", (e) => {
  mouseCircle.style.left = e.pageX + "px";
  mouseCircle.style.top = e.pageY + "px";
  // go back to normal cursor when user want to interact with calculator
  if (
    e.target == resultat ||
    e.target == resContainer ||
    e.target.offsetParent == calc ||
    e.target == calc ||
    e.target == calcContainer
  ) {
    mouseCircle.style.opacity = "0";
  } else {
    mouseCircle.style.opacity = "1";
  }
});
