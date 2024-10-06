#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function analyzeLogs(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла: ", err);
      return;
    }

    const logs = JSON.parse(data);
    const totalGames = logs.length;
    const wins = logs.filter(({ result }) => result === 1).length;
    const losses = totalGames - wins;
    const winPercentage = ((wins / totalGames) * 100).toFixed(2);

    console.log(`Общее количество партий: ${totalGames}`);
    console.log(`Выигранные партии: ${wins}`);
    console.log(`Проигранные партии: ${losses}`);
    console.log(`Процент выигранных партий: ${winPercentage}%`);
  });
}

const logFilePath = path.resolve(process.argv[2] || "logs.json");

analyzeLogs(logFilePath);
