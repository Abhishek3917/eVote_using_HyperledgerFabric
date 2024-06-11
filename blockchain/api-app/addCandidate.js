const { Gateway, Wallets } = require('fabric-network');
const express = require('express');
const path = require('path');
async function main() {
    try {
        
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        
        const identityLabel = 'user1';
        const identityExists = await wallet.get(identityLabel);
        if (!identityExists) {
            console.log(`Identity '${identityLabel}' not found in the wallet.`);
            console.log("Run node enroll.js to create and enroll the user.");
            return;
        }

       
        const gateway = new Gateway();
        const connectionProfile = require('./connection-org1.json');
        const discoveryOptions = { enabled: true, asLocalhost: true };

        await gateway.connect(connectionProfile, {
            wallet,
            identity: identityLabel,
            discovery: discoveryOptions,
        });

        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('basic');

        // Create an Express.js application
        const app = express();
        
        // const port = process.env.PORT;
        const port=3001;
        
        
        app.use(express.json());
        
        app.post('/addCandidate', async (req, res) => {
            const { electionName, candidateName, votes } = req.body;

            // Invoke the chaincode function
            try {
                const response = await contract.submitTransaction('AddCandidate', electionName, candidateName, parseInt(votes));
                console.log(`Transaction response: ${response.toString()}`);
                res.status(200).send(`Transaction response: ${response.toString()}`);
            } catch (error) {
                console.error(`Error processing transaction: ${error.message}`);
                res.status(500).send(`Error processing transaction: ${error.message}`);
            }
        });

        
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(`Error initializing application: ${error.message}`);
    }
}

main();
