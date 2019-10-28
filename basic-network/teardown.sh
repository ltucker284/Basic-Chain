#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -e

# Shut down the Docker containers for the system tests.
docker-compose -f docker-compose.yml kill && docker-compose -f docker-compose.yml down

# remove the local state
rm -f ~/.hfc-key-store/*

# remove chaincode docker images
#docker rm $(docker ps -a -q)
#docker rmi $(docker images dev-* -q)

# Your system is now clean

# Generate new cryptoconfig material for the next network boot up
sh generate.sh