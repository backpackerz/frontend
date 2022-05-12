CONTAINER_ID=$(docker ps -aqf "name=^backpackerz_frontend_ctn$")

docker exec -it $CONTAINER_ID /bin/bash
