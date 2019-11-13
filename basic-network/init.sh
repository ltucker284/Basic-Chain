#!/bin/bash

# Exit on first error
set -e
# delete previous creds
rm -rf ~/.hfc-key-store/*

# copy peer admin credentials into the keyValStore
mkdir -p ~/.hfc-key-store
