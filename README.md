# eVote_using_HyperledgerFabric

This repository contains the code for an e-voting application that leverages the MEAN stack for the web application and Hyperledger Fabric for secure storage of election data. The application provides functionality to manage election candidates and store votes securely on the blockchain. It utilizes the Hyperledger Fabric samples test-network for blockchain interactions and is specifically designed for installation on ```Arch-based distributions```.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Chaincode Functions](#chaincode-functions)
- [node js](#app)
- [conclusion](#conclusion)
## Prerequisites

Before you Build, you need to have the following prerequisites installed:

1. Install angular,node js,npm,Docker, Docker Compose, jq, Git, and Go (Golang).
    ```bash
    sudo pacman -S nodejs npm jq git docker docker-compose go
    sudo yay -S angular-cli
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
   git clone https://github.com/shaheen2532/eVote_using_HyperledgerFabric.git
    ```
2. **frontend**
    ```sh 
    cd frontend
    npm install
    ng serve
    ```
3. **backend**
    ```sh
    cd backend
    npm install
    npm start
    ```
4. **blockchain**
    ```sh
    cd blockchain
    git clone https://github.com/Abhishek3917/HyperledgerVoting.git
    ```
5. move the folder inside the fabric sample folder
6. adjust the path in file start_network.sh stop_network.sh block_details
7. make script executable by running
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
