// in nodeJs we use "require" to import libraries and packages
// but we cant use "require" in front end
// instead we use "import"
import { ethers, providers } from "./ethers-5.6.esm.min.js" // importing ethers from our local linux wsl environment folder
//console.log(ethers)
import { abi, contractAddress } from "./constants.js"
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
const connectButton = document.getElementById("connectButton") // setting up connect button on the front end
//const fundButton = document.getElementById("fundButton") // setting up fund button on the front end
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

async function connect() {
    // adding a function connect to stop popping metamask triggers when hitting refresh
    if (typeof window.ethereum !== "undefined") {
        // if browser does have metamask installed then we connect
        await window.ethereum.request({ method: "eth_requestAccounts" })
        //document.getElementById("connectButton").innerHTML = "Connected" // here we are changing the Button on the webpage if its connected to metamask
        connectButton.innerHTML = "Connected" // since we declared connectButton variable up top
        //to indicate the user that if he is connected; console.log only shows in "CONSOLE"
    } else {
        //document.getElementById("connectButton").innerHTML =
        //    "You need to install Metamask"
        connectButton.innerHTML = "You need to install Metamask" // since we declared connectButton variable up top
    }
}
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.utils.formatEther(balance)) //ethers.utils has a function "formatEther" to make reading
            //ether formated numbers much easier to read
        } catch (error) {
            console.log(error)
        }
    }
}
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value //document.getElementbyId() is borrowing button from index.html
    console.log(`Funding with ${ethAmount}`)
    if (typeof window.ethereum !== "undefined") {
        // In order to fund we need:
        ;/ provider connection to the BC or RPC/

        const provider = new ethers.providers.Web3Provider(window.ethereum) //web3 Provider is same as JsonRpcProvider
        ;/ signer wallet account/

        const signer = provider.getSigner() // since provider is a variable initialized as Web3Provider object and
        // connected to a wallet, so it gives us a wallet
        //console.log(signer)
        ;/ Contract to interact with:  ABI & Address/

        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            }) // we are funding the contract with "ethAmount"
            await listenForTxMine(transactionResponse, provider) // here we are telling JS to wait for this to complete
            console.log("Done")
        } catch (error) {
            console.log(error)
        }
    }
}

;/ ===listen for a Tx to be mined=======/
function listenForTxMine(transactionResponse, provider) {
    // we're gonna await in our fund function and we're gonna have this return a promise
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise(
        /* takes a function as an input parameter*/ (
            resolve /*if this process works correctly*/,
            reject /*reject takes a timeout as an input parametre*/
        ) /*resolves is gonna be done when "listener" finishes listening*/ => {
            // reason: we need to create a listener for BC
            //we want to listen for this event to happen but we wanna tell JS wait for this thing to finish looking
            ;/==for  listenForTxMine we have to define how we are going to listen for this transations/
            // ethers has a way to listen for this event through "contract.once" or "provider.once" which takes triggers one time
            //function listener() {}
            //provider.once(transactionResponse.hash, listener)
            ;/ below we didnt wait for provider.once to finish and put it on  que called "event loop"/
            //due to this problem, the code was not waiting for "listenForTxMine"to finish while the function ends before it
            provider.once(
                transactionResponse.hash,
                (
                    transactionReceipt /*input paramater or a listener function*/
                ) => {
                    //empty paranthesis followed by => is an anonymous function
                    console.log(
                        `Completed with ${transactionReceipt.confirmations} confirmations`
                    )
                    resolve() // only once this tx gets fired and we are going to "resolve" this promise
                }
            )
        }
    )
}
async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing..")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTxMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
