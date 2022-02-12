const fs = require('fs');

function changeTicketNumbers(operation, num){
  //File checker
  if(!fs.existsSync('./ticketNumbers.json')){
    fs.writeFileSync('./ticketNumbers.json', JSON.stringify({
      number: 0
    }));
  }
  let ticketNumbers = JSON.parse(fs.readFileSync('./ticketNumbers.json'));
  if(operation === 'add'){
    ticketNumbers.number += num;
  }else if(operation === 'subtract'){
    ticketNumbers.number -= num;
  }else if(operation === 'set'){
    ticketNumbers.number = num;
  }
  fs.writeFileSync('./ticketNumbers.json', JSON.stringify(ticketNumbers));
}

module.exports = {changeTicketNumbers};