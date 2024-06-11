const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');

async function createEnrollmentID() {
    const caURL = 'https://localhost:7054'; 
    const enrollmentID = 'admin'; 
    const enrollmentSecret = 'adminpw'; 

    try {
        const ca = new FabricCAServices(caURL);

        // Enroll the identity with the Fabric CA server
        const enrollment = await ca.enroll({
            enrollmentID,
            enrollmentSecret, 
        });

        const certificate = enrollment.certificate;
        const privateKey = enrollment.key.toBytes();

        // Save the certificate and private key to a wallet (optional)
        const walletPath = './wallet';
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        const identityLabel = 'user1';

        const identity = {
            credentials: {
                certificate,
                privateKey,
            },
            mspId: 'Org1MSP', 
            type: 'X.509',
        };

        await wallet.put(identityLabel, identity);

        console.log('Enrollment successful. Certificate and private key saved to wallet.');
    } catch (error) {
        console.error('Enrollment failed:', error);
    }
}


createEnrollmentID();