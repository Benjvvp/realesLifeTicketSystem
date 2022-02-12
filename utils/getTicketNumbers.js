const fs = require('fs');

function getTicketNumbers(){
  //File checker
  let ticketNumbers = JSON.parse(fs.readFileSync('./ticketNumbers.json'));
  return ticketNumbers.number;
}

module.exports = {getTicketNumbers};