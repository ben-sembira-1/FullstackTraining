
.PHONY: .build_docker
.build_docker:
	docker build . -t quote-me/backend

.PHONY: main
main: .build_docker

.PHONY: run
run:
	docker-compose up

.PHONY: clean
clean:
	docker-compose down
	yes | docker container prune
	yes | docker image prune
