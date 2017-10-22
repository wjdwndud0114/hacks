web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"team","type":"bytes32"}],"name":"getNumPoints","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"points","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"teamList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"team","type":"bytes32"}],"name":"givePoint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"teamNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xfc0cbd33405d169e0ce93a3087f9ce369c05e7b7');
teams = {"team a": "team-1", "team b": "team-2", "team c": "team-3"}

function voteForTeam() {
  teamName= $("#team").val();
  contractInstance.givePoint(teamName, {from: web3.eth.accounts[0]}, function() {
    let div_id = teams[teamName];
    $("#" + div_id).html(contractInstance.getNumPoints.call(teamName).toString());
  });
}

$(document).ready(function() {
  teamNames = Object.keys(teams);
  for (var i = 0; i < teamNames.length; i++) {
    let name = teamNames[i];
    let val = contractInstance.getNumPoints.call(name).toString()
    $("#" + teams[name]).html(val);
  }
});
