# Blockchain
Implements a Blockchain simulator

Steps to build new docker image:
1. change the WORKDIR path in Dockerfile to your desired docker work directory.
2. Build the docker image by executing `docker build -t blockchain`
3. Run the docker image by executing `docker run -p 8080:8080` blockchain.  This will connect port 8080 externally to port 8080 within the container. 
4. The app will now be available at localhost:8080

The docker image can also be pulled using `docker pull nft23/blockchain`.  This will pull the latest image.
