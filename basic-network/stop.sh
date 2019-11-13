#!/bin/bash

# Exit on first error.
set -e

# Shut down the Docker containers that might be currently running.
docker-compose -f docker-compose.yml stop
