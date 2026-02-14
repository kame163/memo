// import readline from "readline";
// import fs from 'fs';

const fs = require('fs');
const readline = require('readline');


//初期画面
console.log("=== メモアプリ ===");
console.log("1. メモ追加");
console.log("2. 一覧表示");
console.log("3. 削除");
console.log("4. 終了");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("選択してください > ", (answer) => {
  if(answer === "1"){
    console.log("メモ追加モード");
  } else if(answer === "2"){
    console.log("=== メモ一覧 ===");

    const lists = fs.readFileSync("memo.txt", "utf8").split("\n");
    lists.forEach ((list, i) => {
      console.log(`${i + 1}. ${list}`);
    });
  } else if(answer === "3"){
    console.log("削除モード");
    rl.question("削除するメモの番号を入力してください >", (num) => {
      const index = Number(num) -1;
      const lines = fs.readFileSync("memo.txt", "utf8").split("\n");
      if(index < 0 || index >= lines.length){
        console.log("その番号は存在しません");
      } else {
      lines.splice(index, 1);
      fs.writeFileSync("memo.txt", lines.join("\n"));
      console.log("削除しました");
      console.log("=== メモ一覧 ===");
      const lists = fs.readFileSync("memo.txt", "utf8").split("\n");
      lists.forEach ((list, i) => {
        console.log(`${i + 1}. ${list}`);
      });
    }
      rl.close();
    });
  
  } else if(answer === "4"){
    console.log("終了します");
  }
});


// const command = process.argv[2];
// const text = process.argv[3];

// console.log("command:", command);
// // console.log("text:" , text);

// if(command === "add"){
//   fs.appendFileSync('memo.txt', text + '\n');// 内容を記載して改行
// console.log('保存しました');
// } else if(command === "list"){               //一覧を表示
//     const list = fs.readFileSync("memo.txt", "utf8");
//     console.log(list); 
// } else if(command === "delete"){             //削除
//   const index = Number(process.argv[3]) - 1;
//   const lines = fs.readFileSync("memo.txt", "utf8").split("\n");
//   lines.splice(index, 1);
//   fs.writeFileSync("memo.txt", lines.join("\n"));
//   console.log("削除しました");
// }
