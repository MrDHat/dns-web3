const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("creator");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("pewdiepie", {
    value: hre.ethers.utils.parseEther('0.1')
  });
  await txn.wait();
  console.log("Minted domain pewdiepie.creator");

  txn = await domainContract.setRecord("pewdiepie", "Am I a pewdiepie or a creator??");
  await txn.wait();
  console.log("Set record for pewdiepie.creator");

  const address = await domainContract.getAddress("pewdiepie");
  console.log("Owner of domain pewdiepie:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();