peer channel getinfo -c mychannel

echo "do u need to fetch block(Y/n)"
read ans

if [[ $ans == 'y' || 'Y' ]]; then
    echo "block number to fetch (height-1):"
    read block_number
    peer channel fetch $block_number -c mychannel -o localhost:7050 --tls --cafile "${PWD}/../../test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
    echo "file created:mychannel_$block_number.block in same dir"
    echo "do u need to view the block (Y/n)"
    read view_block
    if [[ $view_block == 'y' || 'Y' ]]; then
    echo "which block to view"
    read block_to_view
    configtxlator proto_decode --input mychannel_$block_to_view.block --type common.Block | jq .data.data[0].payload.data.actions
    else 

    fi

fi

    
