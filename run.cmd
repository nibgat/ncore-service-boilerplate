IF %1 == dev (docker-compose -f docker-compose.dev.yaml up --build)
IF %1 == prod (docker-compose up --build)
