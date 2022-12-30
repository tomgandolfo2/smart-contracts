import { expect } from "chai"
import { Contract, Signer } from "ethers"
import { ethers } from "hardhat"

const tokens = (n: number) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Escrow", () => {
    let buyer, seller: Signer, inspector: Signer, lender: Signer
    let realEstate: Contract, escrow: Contract

    beforeEach(async () => {
        // Set-up accounts
        ;[buyer, seller, inspector, lender] = await ethers.getSigners()
        // Deploy RealEstate
        const RealEstate = await ethers.getContractFactory("RealEstate")
        realEstate = await RealEstate.deploy()
        // Mint
        let transaction = await realEstate.connect(seller).mint("abc123")
        await transaction.wait()

        const Escrow = await ethers.getContractFactory("Escrow")
        escrow = await Escrow.deploy(
            await seller.getAddress(),
            realEstate.address,
            await lender.getAddress(),
            await inspector.getAddress()
        )
    })

    describe("Deployment", () => {
        it("returns NFT address", async () => {
            const result = await escrow.nftAddress()
            expect(result).to.equal(realEstate.address)
        })
        it("returns seller address", async () => {
            const result = await escrow.seller()
            expect(result).to.equal(await seller.getAddress())
        })
        it("returns lender address", async () => {
            const result = await escrow.lender()
            expect(result).to.equal(await lender.getAddress())
        })
        it("returns inspector address", async () => {
            const result = await escrow.inspector()
            expect(result).to.equal(await inspector.getAddress())
        })
    })
})
