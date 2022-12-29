// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address payable public seller;
    address public nftAddress;
    address public lender;
    address public inspector;

    constructor(
        address payable _seller,
        address _nftAddress,
        address _lender,
        address _inspector
    ) {
        seller = _seller;
        nftAddress = _nftAddress;
        lender = _lender;
        inspector = _inspector;
    }
}
