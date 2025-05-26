const hre = require("hardhat");

async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");

  const contract = await CrowdFunding.deploy({
    maxPriorityFeePerGas: hre.ethers.parseUnits("1", "gwei"),
    maxFeePerGas: hre.ethers.parseUnits("2", "gwei")
  });

  await contract.waitForDeployment();

  console.log("CrowdFunding deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
