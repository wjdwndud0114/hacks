pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public points;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public teamList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] teamNames) {
    teamList = teamNames;
  }

  // This function returns the total votes a candidate has received so far
  function getNumPoints(bytes32 team) returns (uint8) {
    if (validTeam(team) == false) throw;
    return points[team];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function givePoint(bytes32 team) {
    if (validTeam(team) == false) throw;
    points[team] += 1;
  }

  function validTeam(bytes32 team) returns (bool) {
    for(uint i = 0; i < teamList.length; i++) {
      if (teamList[i] == team) {
        return true;
      }
    }
    return false;
  }
}
