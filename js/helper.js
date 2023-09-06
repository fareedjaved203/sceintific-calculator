import { breakData, replaceTrigFunction } from "./calculator.js";
export const btn_values = document.getElementsByClassName("col");
export const inputElement = document.querySelector(".text-input-container .text-input");
export const calculateResult = document.getElementById("calculate-result");
export let A, B, C, D, E, F, X, Y;
const checkTrignometricMethods = (text) => {
    if (text.includes("sin")) {
        text = replaceTrigFunction(text, "sin", Math.sin);
    }
    if (text.includes("cos")) {
        text = replaceTrigFunction(text, "cos", Math.cos);
    }
    if (text.includes("tan")) {
        text = replaceTrigFunction(text, "tan", Math.tan);
    }
    return text;
};
for (let i = 0; i < btn_values.length; i++) {
    btn_values[i].addEventListener("click", function () {
        if (this.textContent !== null) {
            if (this.textContent.trim() === "AC") {
                inputElement.value = "";
                if (calculateResult !== null) {
                    calculateResult.textContent = "";
                }
            }
            else if (this.textContent.trim() === "DEL") {
                let value = inputElement.value.split("");
                value.pop();
                inputElement.value = value.join("");
            }
            else if (this.textContent.trim() === "->") {
                inputElement.value += "->";
            }
            else if (this.textContent.trim() === "=") {
                if (inputElement.value === "A") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = A;
                        return;
                    }
                }
                else if (inputElement.value === "B") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = B;
                        return;
                    }
                }
                else if (inputElement.value === "C") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = C;
                        return;
                    }
                }
                else if (inputElement.value === "D") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = D;
                        return;
                    }
                }
                else if (inputElement.value === "E") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = E;
                        return;
                    }
                }
                else if (inputElement.value === "F") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = F;
                        return;
                    }
                }
                else if (inputElement.value === "X") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = X;
                        return;
                    }
                }
                else if (inputElement.value === "Y") {
                    if (calculateResult !== null) {
                        calculateResult.textContent = Y;
                        return;
                    }
                }
                else if (inputElement.value.includes("A") ||
                    inputElement.value.includes("B") ||
                    inputElement.value.includes("C") ||
                    inputElement.value.includes("D") ||
                    inputElement.value.includes("E") ||
                    inputElement.value.includes("F") ||
                    inputElement.value.includes("X") ||
                    inputElement.value.includes("Y")) {
                    if (inputElement.value.includes("->")) {
                        let charsToRemove = ["A", "B", "C", "D", "E", "F", "X", "Y"];
                        charsToRemove.forEach((char) => {
                            let index = inputElement.value.indexOf(char);
                            if (index !== -1 && inputElement.value[index - 1] === ">") {
                                let value = "";
                                let parts = inputElement.value.slice(0, index).split("->");
                                let lastPart = parts.join("");
                                if (lastPart !== undefined) {
                                    value = lastPart.trim();
                                }
                                if (value.includes("A")) {
                                    value = value.replace("A", A);
                                }
                                if (value.includes("B")) {
                                    value = value.replace("B", B);
                                }
                                if (value.includes("C")) {
                                    value = value.replace("C", C);
                                }
                                if (value.includes("D")) {
                                    value = value.replace("D", D);
                                }
                                if (value.includes("E")) {
                                    value = value.replace("E", E);
                                }
                                if (value.includes("F")) {
                                    value = value.replace("F", F);
                                }
                                if (value.includes("X")) {
                                    value = value.replace("X", X);
                                }
                                if (value.includes("Y")) {
                                    value = value.replace("Y", Y);
                                }
                                console.log(`value: ${value}`);
                                if (value.includes("sin") ||
                                    value.includes("cos") ||
                                    value.includes("tan")) {
                                    value = checkTrignometricMethods(value);
                                }
                                else {
                                    if (value.includes("^")) {
                                        value = value.replaceAll("^", "**");
                                    }
                                    value = eval(value);
                                }
                                inputElement.value = value;
                                console.log(`this is value right now: ${inputElement.value}`);
                                if (char === "A") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    console.log(`this is the result: ${result}`);
                                    A = parseFloat(result).toFixed(4);
                                }
                                if (char === "B") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    B = parseFloat(result).toFixed(4);
                                }
                                if (char === "C") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    C = parseFloat(result).toFixed(4);
                                }
                                if (char === "D") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    D = parseFloat(result).toFixed(4);
                                }
                                if (char === "E") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    E = parseFloat(result).toFixed(4);
                                }
                                if (char === "F") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    F = parseFloat(result).toFixed(4);
                                }
                                if (char === "X") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    X = parseFloat(result).toFixed(4);
                                }
                                if (char === "Y") {
                                    inputElement.value = checkTrignometricMethods(inputElement.value);
                                    let result = eval(inputElement.value.trim());
                                    Y = parseFloat(result).toFixed(4);
                                }
                            }
                        });
                    }
                }
                if (inputElement.value.indexOf("(") !== -1) {
                    let temp = inputElement.value.indexOf("(");
                    if (temp > 0) {
                        if (inputElement.value[temp - 1] !== "*" &&
                            inputElement.value[temp - 1] !== "+" &&
                            inputElement.value[temp - 1] !== "-" &&
                            inputElement.value[temp - 1] !== "/" &&
                            inputElement.value[temp - 1] !== "n" &&
                            inputElement.value[temp - 1] !== "s" &&
                            inputElement.value[temp - 1] !== "√") {
                            let newString = inputElement.value.slice(0, temp) +
                                "*" +
                                inputElement.value.slice(temp);
                            inputElement.value = newString;
                        }
                    }
                }
                breakData(inputElement.value);
            }
            //this else statement checks if the stored variable is used already or not
            else {
                if (this.textContent.trim() === "A" ||
                    this.textContent.trim() === "B" ||
                    this.textContent.trim() === "C" ||
                    this.textContent.trim() === "D" ||
                    this.textContent.trim() === "E" ||
                    this.textContent.trim() === "F" ||
                    this.textContent.trim() === "X" ||
                    this.textContent.trim() === "Y") {
                    let variable = "";
                    if (this.textContent.trim() === "A" ||
                        this.textContent.trim() === "B" ||
                        this.textContent.trim() === "C" ||
                        this.textContent.trim() === "D" ||
                        this.textContent.trim() === "E" ||
                        this.textContent.trim() === "F" ||
                        this.textContent.trim() === "X" ||
                        this.textContent.trim() === "Y") {
                        variable = `${this.textContent.trim()}`;
                        inputElement.value += variable;
                    }
                    if (inputElement.value === "") {
                        variable = `${this.textContent.trim()}`;
                        inputElement.value += variable;
                    }
                }
                else {
                    inputElement.value += this.textContent.trim();
                }
            }
        }
    }),
        false;
}
