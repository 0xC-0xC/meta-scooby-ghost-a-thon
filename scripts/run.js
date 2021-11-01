const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Scooby", "Velma", "Shaggy"],       // Names
      ["QmQUaY1gJqjgWaDz2NJmMbskEUbSDngidKXEHFWa7t3f3t", // Scooby
      "QmYH8iBCQ8NPL7XztyjQ9wEGE5qivhJ9Qu11DLqMNfVcv7", // Velma
      "QmZ9oHUKcqnb4x1nVSRuwtuWLjHV4FVH63gu2ZGpMC4rEj"], // Shaggy
      [200, 150, 1000000],                    // HP values
      [50, 75, 500],                       // Attack damage values
      "The Phantom", // Boss name
      "https://i.imgur.com/jFhvbic.gif", // Boss image
      10000, // Boss hp
      50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(0);
    await txn.wait();
    console.log("Minted NFT #1");
  
    txn = await gameContract.mintCharacterNFT(1);
    await txn.wait();
    console.log("Minted NFT #2");

    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    console.log("Minted NFT #3");

    console.log("Done deploying and minting!");

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
  };
  
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