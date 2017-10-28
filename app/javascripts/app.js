// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import hackathon_artifacts from '../../build/contracts/Hackathon.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Hackathon = contract(hackathon_artifacts);

$(document).ready(function() {
  if(typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask");
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to https://localhost:8545");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Hackathon.setProvider(web3.currentProvider);
  var hInst;
  Hackathon.deployed().then(function(c) {
    hInst = c;

    hInst.getGivers.call().then(function(givers){
      for(var i = 0; i < givers.length; i++) {
        var addr = givers[i];
        hInst.getInfoGiverName.call(givers[i]).then(function(giverName){
          $('#judgeList').append('<dt>'+web3.toAscii(giverName)+'</dt><dd>'+addr+'</dd>');

        });
      }
    });

   
    hInst.getTeams.call().then(function(teams){
      for(var j = 0; j < teams.length; j++) {
        var addr = teams[j];
        hInst.getInfoTeamName.call(teams[j]).then(function(teamName){
          $('#teamList').append('<dt>'+web3.toAscii(teamName)+'</dt><dd>'+addr+'</dd>');
        });
      }
    });

  }).catch(function(err) {
    console.log(err.message);
  });
});
