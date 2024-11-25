#!/bin/bash

docker build -t saleappback -f app/Dockerfile ./app
docker build -t saleappdb -f db/Dockerfile .
