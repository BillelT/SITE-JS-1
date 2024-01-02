window.addEventListener("keydown", (e) => {
  let lastCar = total.slice(-1);
  target = e.key;
  // checking if user select calculator and if the key press is a key on the calculator
  for (let i = 0; i < tableCalcKey.length; i++) {
    if (resBorderIsBlue == true && tableCalcKey[i].innerHTML == e.key) {
      if (
        target !== "Backspace" && // key 'C' replace by Backspace, usually use on keyboard to delete
        target !== "Enter" && // key '=' replace by Enter, usually use on keyboard to ending input
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
    if (total === "0") {
      total = "0";
    }
  }
  if (target === "Enter") {
    total = eval(total);
    total = total.toString();
  }
  resultat.innerHTML = total;
});
calc.addEventListener("mouseup", function chiffres(e) {
  endTimer = new Date();
  let timer = endTimer - startTimer;
  let lastCar = total.slice(-1);
  target = e.target.innerHTML;
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
    total = total.slice(0, -1);
    if (total === "0") {
      total = "0";
    }
    if (timer > 1000) {
      total = "0";
    }
  } else if (target === "=") {
    total = eval(total);
    total = total.toString();
  }
  resultat.innerHTML = total;
});
