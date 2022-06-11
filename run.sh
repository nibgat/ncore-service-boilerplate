#!/bin/bash
if [ $1 = "prod" ]; then
    docker-compose up --build;
else
    docker-compose -f docker-compose.dev.yaml up --build;
fi;
exit;
