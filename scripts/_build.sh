IMG_TAG=backpackerz_frontend_img

# 이미지 빌드
docker build -t $IMG_TAG -f Dockerfile .

# 동일한 이름의 이전 컨테이너 제거
CONTAINER_NAME=backpackerz_frontend_ctn
docker rm -f  $(docker ps -a | grep $CONTAINER_NAME | awk "{print \$1}")

# 지난 이미지 삭제
EXPIRED_IMG_ID=$(docker images | grep "<none>" | awk "{print \$3}")
docker rmi -f $EXPIRED_IMG_ID

# 컨테이너 생성
# docker run -itd --name backpackerz_frontend_ctn -p 80:80 --network re_express_net --restart unless-stopped backpackerz_frontend_img
docker run -itd --name $CONTAINER_NAME -p 80:3000 --restart unless-stopped $IMG_TAG

# root로 docker 설치시 sudo 없이 도커를 실행하면 아래와 같은 에러가 발생
# Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http:
# //%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/json: dial unix /var/run/docker.sock: connect: permission denied