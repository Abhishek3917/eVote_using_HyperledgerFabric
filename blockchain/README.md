# HyperledgerVoting

This repository contains the chaincode for managing election candidates using Hyperledger Fabric. The chaincode provides functionality to add, update, delete, and query candidates and their votes. it is a demo project to store candidates details in blockchain uses hyper ledger fabric samples test-network.the installation sepcified for ``` Arch based distro ```


## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Chaincode Functions](#chaincode-functions)
- [node js](#app)
- [conclusion](#conclusion)

## Prerequisites

Before you can deploy this chaincode, you need to have the following prerequisites installed:

1. Install Docker, Docker Compose, jq, Git, and Go (Golang).
    ```bash
    sudo pacman -S jq git docker docker-compose go
    ```
2. Start Docker and enable it to run at startup:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
    ```
3. Add your user to the Docker group:
    ```bash
    sudo usermod -aG docker username
    ```
4. Reboot your device to apply the changes.
5. Install Hyperledger Fabric binaries, Docker images, and samples.
[Hyperledger Fabric v2.x](https://hyperledger-fabric.readthedocs.io/en/release-2.5/install.html)
## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Abhishek3917/HyperledgerVoting.git
    ```
2. move the folder inside the fabric sample folder
3. adjust the path in file start_network.sh stop_network.sh block_details
4. make script executable by running
    ```bash 
    chmod +x *.sh
    ```
## chaincode-functions

1. ```bash
    cd chaincode
    go mod init candidate_chaincode
    go mod tidy
    ```
2. now run ```sh stat_network.sh``` to start network with initializing blockchain in channel peer

## app

1. install package
    ```bash
    npm install
    ```
2. run node enroll.js
3. run all .js file to start 
    ```
    node <script>.js
    ```

## conclusion
1. run ``` . set_path.sh``` in terminals where querryCandidate.js and block_details.sh  is going to run
2. run ``` sh stop_network.sh``` to stop the network and remove files
3. refer hyper ledger fabric docs for any doubts