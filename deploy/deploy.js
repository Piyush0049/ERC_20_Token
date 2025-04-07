const { network } = require("hardhat");
const { INITIAL_SUPPLY, developmentChains } = require("../helper-hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(INITIAL_SUPPLY);
  const contract = await deploy("OurToken", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
  });
  log(`ourToken deployed at ${contract.address}`);
  console.log(network.name);
  if (!developmentChains.includes(network.name)) {
    log("Verifying contract...");
    await run("verify:verify", {
      address: contract.address,
      constructorArguments: [INITIAL_SUPPLY],
    });
  }
};

module.exports.tags = ["all", "token"];
