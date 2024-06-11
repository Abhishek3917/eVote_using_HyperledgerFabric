test_network="/home/night/go/src/github.com/hlf_prj/fabric-samples/test-network"
clean="/home/night/go/src/github.com/hlf_prj/fabric-samples/main_pro/app"
cd $clean
echo "removing generated files"
rm -r wallet/
rm connection-org1.json mychannel_*.block
rm -r node_modules

cd $test_network

./network.sh down