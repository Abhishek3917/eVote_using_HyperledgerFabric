const { Gateway, Wallets } = require('fabric-network');
const express = require('express');
const path = require('path');

async function main() {
    const app = express();
    const port = 3002;

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

        
        const connectionProfile = require('./connection-org1.json');
        const discoveryOptions = { enabled: true, asLocalhost: true };

        const gateway = new Gateway();

        
        await gateway.connect(connectionProfile, {
            wallet,
            identity: identityLabel,
            discovery: discoveryOptions,
        });

        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('basic');

        // Middleware to parse JSON requests
        app.use(express.json());

        
        app.post('/deleteCandidate', async (req, res) => {
            const { candidateID } = req.body;

            try {
                // Invoke the chaincode function to delete a candidate
                const response = await contract.submitTransaction('DeleteCandidate', candidateID);
                console.log(`Transaction response: ${response.toString()}`);
                res.status(200).json({ message: `Candidate '${candidateID}' deleted successfully` });
            } catch (error) {
                console.error(`Error processing transaction: ${error.message}`);
                res.status(500).json({ error: `Error processing transaction: ${error.message}` });
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