.PHONY: up
up:
	docker-compose up --build -d

.PHONY: down
down:
	docker-compose down

.PHONY: clean
clean:
	docker-compose down -v

.PHONY: lint
lint:
	flake8 --config src/Codenalysis/api/.flake8 src/Codenalysis/api
	eslint src/Codenalysis/web

.PHONY: test
test:
	${MAKE} lint