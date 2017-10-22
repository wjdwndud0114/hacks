pragma solidity ^0.4.10;

contract Hackathon {
  
  struct giver {
    address giverAddr;
    bytes32[] giverName;
    uint hackPts;
    mapping(address => uint) usedHackPts;
  }

  struct team {
    address teamAddr;
    bytes32[] teamName;
    uint receivedHackPts;
  }

  mapping(address => giver) public infoGiver;
  mapping(address => team) public infoTeam;
  address[] teams;
  address[] givers;

  address public admin;
  uint public totalHackPts;
  uint public totalGivenHackPts;
  bool public isStarted;
  bool public isEnded;

  function Hackathon(uint totalPts) {
    admin = msg.sender;
    totalHackPts = totalPts;
    totalGivenHackPts = numOfTeams = numOfGivers = 0;
    isStarted = isEnded = false;
  }

  function startEvent() {
    require(msg.sender == admin && !isStarted);
    totalHackPts = numOfGivers * 100;
    isStarted = true;
  }

  function endEvent() {
    require(msg.sender == admin && isStarted);
    isEnded = true;
  }

  function addTeam(address addrTeam, bytes32[] nameTeam) {
    require(msg.sender == admin && !isStarted);
    infoTeam[addrTeam] = team(addrTeam, nameTeam, 0);
    teams.push(addrTeam);
  }

  function addGiver(address addrGiver, bytes32[] nameGiver) {
    require(msg.sender == admin && !isStarted);
    infoGiver[addrGiver] = giver(addrGiver, nameGiver, 100);
    givers.push(addrGiver);
  }

  function givePt(address addrTeam, uint amount) {
    require(validateGiver(msg.sender) && !isEnded && infoGiver[msg.sender].hackPts - amount >= 0);
    infoTeam[addrTeam].receivedHackPts += amount;
    infoGiver[msg.sender].hackPts -= amount;
    infoGiver[msg.sender].usedHackPts[addrTeam] += amount;
    if((totalGivenHackPts += amount) == totalHackPts) {
      isEnded = true;
    }
  }
  
  function validateGiver(address sender) returns (bool) {     
    return infoGiver[sender].giverAddr != 0x0;
  }
}
