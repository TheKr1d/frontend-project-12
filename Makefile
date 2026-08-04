lint-frontend:
	make -C frontend lint

install:
	npm ci

start-backend:
	npx start-server -s ./frontend/dist --port 5001

start-frontend:
	cd frontend && npm run dev

develop:
	make start-backend & make start-frontend

deploy:
	git push heroku main

start:
	make start-backend

build:
	rm -rf frontend/dist
	npm run build