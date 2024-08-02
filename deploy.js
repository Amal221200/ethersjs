const ethers = require('ethers');
const fs = require('fs/promises');
require('dotenv').config()

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = await fs.readFile('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8');
    const binary = await fs.readFile('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8');

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    const contract = await contractFactory.deploy()
     await contract.deploymentTransaction().wait(1)

     console.log(await contract.getAddress());

    // const nonce = await wallet.getNonce()
    // const tx = {
    //     nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: `0x${binary}`,
    //     chainId: 1337
    // }

    // const sendTxResponse = await wallet.sendTransaction(tx)
    // await sendTxResponse.wait(1)
    // console.log(sendTxResponse);
    // await contract.store(48);
    // const f = await contract.retrieve()
    // console.log(f);
}

main()