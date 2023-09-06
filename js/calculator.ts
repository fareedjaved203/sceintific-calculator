import { calculateResult, A, B, C, D, E, F, X, Y } from "./helper.js";
export const breakData = (text: string): void => {
  try {
    text = text.trim();
    if (text === "") {
      if (calculateResult !== null) {
        calculateResult.textContent = "";
      }
    } else if (text === "π") {
      if (calculateResult !== null) {
        calculateResult.textContent = String(Math.PI.toFixed(4));
      }
    } else if (text === "e") {
      if (calculateResult !== null) {
        calculateResult.textContent = String(Math.E.toFixed(4));
      }
    } else {
      // Check for invalid input
      const invalidInputRegex =
        /(ee)|(ππ)|(AA)|(AB)|(AC)|(AD)|(AE)|(AF)|(AX)|(AY)|(BB)|(BC)|(BD)|(BE)|(BF)|(BX)|(BY)|(CC)|(CD)|(CE)|(CF)|(CX)|(CY)|(DD)|(DE)|(DF)|(DX)|(DY)|(EE)|(EF)|(EX)|(EY)|(FF)|(FX)|(FY)|(XX)|(XY)|(YY)/;
      if (invalidInputRegex.test(text)) {
        throw new Error("Invalid input: missing operator");
      }

      // Convert trigonometric functions with numbers to equivalent expressions with parentheses

      // Replace variables and constants with their values
      text = text.replace(/A/g, String(A));
      text = text.replace(/B/g, String(B));
      text = text.replace(/C/g, String(C));
      text = text.replace(/D/g, String(D));
      text = text.replace(/E/g, String(E));
      text = text.replace(/F/g, String(F));
      text = text.replace(/X/g, String(X));
      text = text.replace(/Y/g, String(Y));
      text = text.replace(/π/g, String(Math.PI.toFixed(4)));
      text = text.replace(/e/g, String(Math.E.toFixed(4)));

      let result: number = 0;
      if (
        text.includes("sin") ||
        text.includes("cos") ||
        text.includes("tan") ||
        text.includes("√") ||
        text.includes("^")
      ) {
        let analyzedText = evaluateSpecialMethods(text);
        if (analyzedText !== undefined) {
          result = eval(analyzedText) as number;
        }
      } else {
        result = eval(text) as number;
      }
      if (calculateResult !== null) {
        calculateResult.textContent = Number.isInteger(result)
          ? result.toString()
          : result.toFixed(4);
      }
    }
  } catch (error) {
    if (calculateResult !== null) {
      calculateResult.textContent = "Error";
    }
  }
};

export const evaluateSpecialMethods = (text: string): string => {
  while (
    text.includes("sin") ||
    text.includes("cos") ||
    text.includes("tan") ||
    text.includes("π") ||
    text.includes("e") ||
    text.includes("^") ||
    text.includes("√")
  ) {
    if (text.includes("sin")) {
      text = replaceTrigFunction(text, "sin", Math.sin);
    }
    if (text.includes("cos")) {
      text = replaceTrigFunction(text, "cos", Math.cos);
    }
    if (text.includes("tan")) {
      text = replaceTrigFunction(text, "tan", Math.tan);
    }
    if (text.includes("π")) {
      let index = text.indexOf("π");
      let num = String(Math.PI.toFixed(4));
      let newString = "";
      newString = text.slice(0, index) + num + text.slice(index + 1);
      text = newString.replace("π", "");
    }
    if (text.includes("e")) {
      let index = text.indexOf("e");
      let num = String(Math.E.toFixed(4));
      let newString = "";
      newString = text.slice(0, index) + num + text.slice(index + 1);
      text = newString.replace("e", "");
    }
    if (text.includes("^")) {
      text = text.replace("^", "**");
    }
    if (text.includes("√")) {
      let index = text.indexOf("√");
      let numberStartIndex = index + 1;
      let numberEndIndex = numberStartIndex;
      let result: any = "";

      // Check for the presence of parentheses
      if (text[numberStartIndex] === "(") {
        numberStartIndex++;
        if (text[numberStartIndex] === "-") {
          return (text = "Error");
        }
        while (numberEndIndex < text.length && text[numberEndIndex] !== ")") {
          numberEndIndex++;
        }
        if (text[numberEndIndex] === ")") {
          numberEndIndex++;
          let modifyVariable = text.slice(numberStartIndex, numberEndIndex - 1);

          // Replace "^" with "**"
          if (modifyVariable.includes("^")) {
            modifyVariable = modifyVariable.replaceAll("^", "**");
          }

          // Replace "e" with its value
          if (modifyVariable.includes("e")) {
            modifyVariable = modifyVariable.replaceAll("e", Math.E.toFixed(4));
          }

          // Replace "π" with its value
          if (modifyVariable.includes("π")) {
            modifyVariable = modifyVariable.replaceAll("π", Math.PI.toFixed(4));
          }

          result = eval(modifyVariable);
          result = String(Math.sqrt(result));
          let squareRootText = text.slice(index, numberEndIndex);
          text = text.replace(squareRootText, result);
        } else {
          result = "Error";
          text = result;
        }
      } else {
        result = "Error";
        text = result;
      }
    }
  }
  return text;
};

type MathFunction = (x: number) => number;

export function replaceTrigFunction(
  text: string,
  functionName: string,
  mathFunction: MathFunction
): string {
  let index = text.indexOf(functionName);

  let numberStartIndex: any = index + functionName.length;
  let numberEndIndex: any = numberStartIndex;
  let result: string = "";

  // Check for the presence of parentheses
  if (text[numberStartIndex] === "(") {
    numberStartIndex++;
    while (numberEndIndex < text.length && text[numberEndIndex] !== ")") {
      numberEndIndex++;
    }
    if (text[numberEndIndex] === ")") {
      numberEndIndex++;
      let modifyVariable = text.slice(numberStartIndex, numberEndIndex - 1);

      // Check for the presence of "Infinity"
      if (modifyVariable.includes("^")) {
        modifyVariable.replaceAll("^", "**");
      }
      if (modifyVariable.includes("√")) {
        let tempStartIndex = numberStartIndex;
        numberStartIndex++;
        if (text[numberStartIndex] === "-") {
          return (text = "Error");
        }
        while (numberEndIndex < text.length && text[numberEndIndex] !== ")") {
          numberEndIndex++;
        }
        if (text[numberEndIndex] === ")") {
          let tempEndIndex = numberEndIndex - 1;
          numberEndIndex++;
          let modifyVariable = text.slice(numberStartIndex, numberEndIndex - 1);

          // Replace "^" with "**"
          if (modifyVariable.includes("^")) {
            modifyVariable = modifyVariable.replaceAll("^", "**");
          }

          // Replace "e" with its value
          if (modifyVariable.includes("e")) {
            modifyVariable = modifyVariable.replaceAll("e", Math.E.toFixed(4));
          }

          // Replace "π" with its value
          if (modifyVariable.includes("π")) {
            modifyVariable = modifyVariable.replaceAll("π", Math.PI.toFixed(4));
          }
          result = eval(modifyVariable);
          result = String(Math.sqrt(Number(result)));
          let squareRootText = text.slice(index, numberEndIndex);
          let temoVar = text.slice(tempStartIndex, tempEndIndex + 1);
          modifyVariable.replace(temoVar, result);
          console.log(`temp var: ${temoVar}`);
          text = text.replace(squareRootText, result);
          console.log(`this sin sqrt: ${text}`);
          console.log(tempStartIndex);
          console.log(tempEndIndex);
          result = text;
        }
      }
      if (modifyVariable.includes("e")) {
        modifyVariable.replaceAll("e", Math.E.toFixed(4));
      }
      if (modifyVariable.includes("π")) {
        modifyVariable.replaceAll("π", Math.PI.toFixed(4));
      }
      result = eval(modifyVariable);
      if (result === "NaN") {
        result = "Error";
      }
      console.log(`result: ${result}`);
    } else {
      console.log(`2nd last error?`);

      result = "Error";
    }
  } else {
    console.log(`last error?`);
    result = "Error";
  }

  // Check for the specified strings
  if (result !== "Error" && result !== "NaN") {
    console.log(`result where required: ${result}`);
    let numberInDegrees = Number(result);
    let numberInRadians = numberInDegrees;

    if (
      functionName === "tan" &&
      Math.abs((numberInRadians % Math.PI) - Math.PI / 2) < 1e-10
    ) {
      result = "Infinity";
    } else {
      result = String(mathFunction(numberInRadians).toFixed(4));
    }
  }

  let functionText = text.slice(index, numberEndIndex);
  console.log(`this is the pure result: ${result}`);

  return text.replace(functionText, result);
}
