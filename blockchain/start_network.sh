


test_network="/home/night/go/src/github.com/hlf_prj/fabric-samples/test-network"
connection_1="/home/night/go/src/github.com/hlf_prj/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com
"

cd $test_network

./network.sh up -ca

echo "NETWORK IS UP"

./network.sh createChannel 
echo "channel is created "

./network.sh deployCC -ccn basic -ccp ../main_pro/chaincode/ -ccl go 
echo "chaincode is deployed "

echo "network is up--------->"
echo "channel created: mychannel ------->"
echo "blockchain deployed on peer in channel with blochain name : basic"

cd $connection_1
cp -v connection-org1.json /home/night/go/src/github.com/hlf_prj/fabric-samples/main_pro/app



