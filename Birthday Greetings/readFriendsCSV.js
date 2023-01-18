import fs from "fs";
import { parse } from "csv-parse";

const todayDate = new Date();
let detailedDate = todayDate.toISOString().substring(0, 10);
detailedDate = detailedDate.split("");
detailedDate[4] = "/";
detailedDate[7] = "/";
detailedDate = detailedDate.join("");

const febTwentyNinth = "02/29";
const febTwentyEigth = "02/28";

export function readFromCSV() {
  return fs
    .createReadStream("./friends.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
    })
    .on("end", function () {
      console.log("You've run out of friends");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

export function sendEmail() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./friends.csv", { encoding: "utf8" })
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        // If today is their birthday, email them while taking into account 29th Feb
        if (febTwentyNinthBirthday(row)) {
          resolve("Happy birthday, dear" + row[0] + "!");
          console.log(
            "Happy birthday!",
            "\n",
            "Happy birthday, dear" + row[0] + "!"
          );
        } else if (normalBirthday(row)) {
          resolve("Happy birthday, dear" + row[0] + "!");
          console.log(
            "Happy birthday!",
            "\n",
            "Happy birthday, dear" + row[0] + "!"
          );
        } else {
          // Do nothing
        }
      })
      .on("end", function () {
        reject({
          status: 404,
          message: "No emails to send",
        });
        console.log("No emails to send");
      })
      .on("error", function (error) {
        reject({ status: 500, message: error.message });
        console.log(error.message);
      });
  });
}

export function sendSMS() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./friends.csv", { encoding: "utf8" })
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        // If today is their birthday, email them while taking into account 29th Feb
        if (febTwentyNinthBirthday(row)) {
          resolve("Happy birthday, dear" + row[0] + "!");
          console.log("Happy birthday, dear" + row[0] + "!");
        } else if (normalBirthday(row)) {
          resolve("Happy birthday, dear" + row[0] + "!");
          console.log("Happy birthday, dear" + row[0] + "!");
        } else {
          // Do nothing
        }
      })
      .on("end", function () {
        reject({
          status: 404,
          message: "No SMS to send",
        });
        console.log("No SMS to send");
      })
      .on("error", function (error) {
        reject({ status: 500, message: error.message });
        console.log(error.message);
      });
  });
}

function febTwentyNinthBirthday(row) {
  if (
    " " + detailedDate.indexOf(febTwentyEigth) > -1 &&
    row[2].indexOf(febTwentyNinth) > -1
  ) {
    return true;
  } else {
    return false;
  }
}

function normalBirthday(row) {
  if (
    " " + detailedDate === row[2] &&
    " " + detailedDate.indexOf(febTwentyNinth) == -1
  ) {
    return true;
  } else {
    return false;
  }
}

// readFromCSV();
// sendEmail();
// sendSMS();
