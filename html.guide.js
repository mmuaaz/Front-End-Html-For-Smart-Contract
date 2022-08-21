;/==== Creating front end web3 websites=====/
// creating file index.html > typing "!" will auto create a basic script; we get rid of meta code lines
// download extension "live server"
// https://docs.metamask.io/guide/
// the first thing we want to see is that if "window.ethereum" exist, which we can access by right clicking and selecting "inspect"
// check "console" type "window.ethereum"
//---<button id="connectButton" onclick="connect()">Connect Metamask</button> --*/; this portion of code is written in "index.html" which is creating a button
//named "ConnectButton" visible as "connect Metamask" and we have linked this with function "connect()" that we created in scripts section
// <script src="./index.js" type="text/javascript"></script>    This code written to import JS script from file "index.js"
// created another button for "fund" function
;/----Importing EthersJs Library without require()/
// https://docs.ethers.io/v5/getting-started/     open ethers library from here, copy and paste everything from there to a new file "ether-5.6.esm.min.js"
//<script src="./index.js" type="text/javascript"></script>    after importing the library we changed this code to:
// <script src="./index.js" type="modules"></script>   which allows us to work with modules that we imported
// after changing front end script to "type=module" the buttons on the live website wont work so we need to move the "on-click connect()" and
// "on click fund()" to back end in "index.js"
;/=== Web3Provider--/
// web3provider is an object in ethers which wraps around stuff like metamask which has an endpoint. just like JsonRpcProvider which used to wrap around "alchemy" RPC endpoint
;/=== Getting a contract to interact with it----/
// since address get changed when a SC is deployed so we devs usually create a file named as "constant.js"
// "abi"can be found by going to previous "hardhat fund me project" goto file "artifacts" > contracts > FundMe.json and copy the whole "abi"
// define a const abi and paste your "abi" you obtained from the previous project
;/===Getting the Address to interact with the SC---/
// to get the address; we will be deploying it on our local host, so open 2 terminals, split 1 terminal and RUN comm: cd ..
// Run Comm: cd FundMe-hardhat   This is the same directory where I created the last project "hardhat Fund me"
// Run Comm: yarn hardhat node      the SC FundMe.sol gets deployed at a local node, copy the address from there
// paste that into a "export const contractAddress" in "contracts.js" file
;/===Metamask Error---*/
// sometimes when you restart the hardhat node, the metamask goes crazy
// goto metamask > settins > advanced settings > reset account
;/+++  RESET ACCOUNT IS NOT FOR ETHEREUM MAINNET++++++/
//---------------
;/ below we didnt wait for provider.once to finish and put it on  que called "event loop"/
//due to this problem, the code was not waiting for "listenForTxMine"to finish while the function ends before it
;/ index.html editing for INPUT FORMS to add a button which allows user to fund any amount they want*/
//     <label for="fund">ETH Amount</label>      label for "fund" means it is FUND button, while ETHAMOUNT is the label
// <input id="ethAmount" placeholder="0.1" />   input command allows us to give a box where we can input any value while "placeholder" is gonna be printed there to
//guide the user to input 0.1
//  <input id="ethAmount" placeholder="0.1" />    in this code we have nothing between "input"tags, so we can shorten the close by "/>" only
// above code can be written as <input id="ethAmount" placeholder="0.1" ></input>
