

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Assuming "ChatApp" is the name of your contract in Solidity
const ChatAppModule = buildModule("ChatAppModule", (m) => {
  // Assuming "ChatApp" is your contract's name
  const chatApp = m.contract("ChatApp");

  // Define any other contract interactions or utility functions as needed

  return { chatApp };
});

module.exports = ChatAppModule;
