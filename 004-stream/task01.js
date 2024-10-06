#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function writeLogs(path, result) {
  fs.readFile(path, "utf8", (err, data) => {
    let logs = [];

    if (!err && data) {
      logs = JSON.parse(data);
    }

    const logEntry = {
      date: new Date().toISOString(),
      result: result,
    };

    logs.push(logEntry);

    fs.writeFile(path, JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        console.error("Ошибка записи в файл: ", err);
      }
    });
  });
}

function playGame(path) {
  rl.question("Введите 1 (орёл) или 2 (решка): ", (answer) => {
    const userChoice = parseInt(answer, 10);
    const randomChoice = Math.floor(Math.random() * 2) + 1;

    if (userChoice !== 1 && userChoice !== 2) {
      console.log("Неверный ввод! Введите 1 или 2.");
      rl.close();
      return;
    }
    if (userChoice === randomChoice) {
      console.log("Победа!");
      writeLogs(path, 1);
    } else {
      console.log("Вы не угадали!");
      writeLogs(path, 0);
    }
    rl.close();
  });
}

const logFilePath = path.resolve(process.argv[2] || "logs.json");

playGame(logFilePath);
