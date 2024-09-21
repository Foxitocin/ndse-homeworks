#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .command("current", "Get the current date and time", (yargs) => {
    return yargs
      .option("year", {
        alias: "y",
        describe: "Show the current year",
        type: "boolean",
      })
      .option("month", {
        alias: "m",
        describe: "Show the current month",
        type: "boolean",
      })
      .option("date", {
        alias: "d",
        describe: "Show the current date",
        type: "boolean",
      });
  })
  .command("add", "Add days or month to the current date", (yargs) => {
    return yargs
      .option("days", {
        alias: "d",
        describe: "Amount of days to add",
        type: "number",
      })
      .option("months", {
        alias: "m",
        describe: "Amount of months to add",
        type: "number",
      });
  })
  .command("sub", "Subtract days or month from the current date", (yargs) => {
    return yargs
      .option("days", {
        alias: "d",
        describe: "Number of days to subtract",
        type: "number",
      })
      .option("months", {
        alias: "m",
        describe: "Number of months to subtract",
        type: "number",
      });
  }).argv;

const date = new Date();
switch (true) {
  case argv._.includes("current"):
    switch (true) {
      case argv.year:
        console.log(date.getFullYear());
        break;
      case argv.month:
        console.log(date.getMonth() + 1);
        break;
      case argv.date:
        console.log(date.getDate());
        break;
      default:
        console.log(date.toISOString());
    }
    break;

  case argv._.includes("add"):
    if (argv.days) date.setDate(date.getDate() + argv.days);
    if (argv.months) date.setMonth(date.getMonth() + argv.months);
    console.log(date.toISOString());
    break;

  case argv._.includes("sub"):
    if (argv.days) date.setDate(date.getDate() - argv.days);
    if (argv.months) date.setMonth(date.getMonth() - argv.months);
    console.log(date.toISOString());
    break;
}
