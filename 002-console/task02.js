#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MIN = 0;
const MAX = 100;

const MISTERY_NUMBER = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
let attempts = 0;

console.log(`Загадано число в диапазоне от ${MIN} до ${MAX}`);

const attemptGuess = () => {
  rl.question("Введите ваше число: ", (answer) => {
    const guess = parseInt(answer, 10);
    attempts++;
    if (isNaN(guess)) {
      console.log("Введите корректное число.");
      attemptGuess();
    } else if (guess < MISTERY_NUMBER) {
      console.log("Больше");
      attemptGuess();
    } else if (guess > MISTERY_NUMBER) {
      console.log("Меньше");
      attemptGuess();
    } else {
      console.log(`Отгадано число ${guess}`);
      console.log(`Количество попыток: ${attempts === 0 ? 1 : attempts}`);
      rl.close();
    }
  });
};

attemptGuess();
