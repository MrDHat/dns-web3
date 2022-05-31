// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;
    mapping(string => string) public records;

    constructor() {
        console.log("Domains contract!");
    }

    function register(string calldata name) public {
        // verify if the name is already registered
        require(domains[name] == address(0));

        domains[name] = msg.sender;
        console.log("Registered domain: %s by %s", name, msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        require(domains[name] == msg.sender);
        records[name] = record;
        console.log("Set record for domain: %s to %s", name, record);
    }

    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
