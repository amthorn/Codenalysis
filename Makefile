.PHONY: up-bg
up-bg:
	docker-compose up --build -d

.PHONY: up
up:
	docker-compose up --build

.PHONY: down
down:
	docker-compose down