// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import hackathon_artifacts from '../../build/contracts/Hackthon.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Hackathon = contract(hackathon_artifacts);

$(document).ready(function() {
  if(typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask");
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to https://localhost:8545");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545");
  }

  Hackathon.setProvider(web3.currentProvider);
  
  Hackathon.deployed().then(function(contractInstance) {
    var infoG = contractInstance.infoGivers;
    var arrG = contractInstance.givers;
    var infoT = contractInstance.infoTeams;
    var arrT = contractInstance.teams;
    for(var i = 0; i < arrG.length; i++) {
      $('#judgeList').append('<li>' + infoG[arrG[i]].giverAddr + '\n' + infoG[arrG[i]].giverName + '</li>');
    }
    for(var i = 0; i < arrT.length; i++) {
      $('#teamList').append('<li>' + infoT[arrT[i]] + '\n' + infoT[arrT[i]]+ '</li>');
    }
  });


});
