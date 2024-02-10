# Getting Started

### Installation

1. Clone this project
1. Run: `docker-compose run --rm app npm install`
1. Run: `docker-compose up -d` to bring up container(s)
1. Run: `docker-compose logs -f` to tail logs
1. Navigate to `http://localhost:3000/` in your browser

### Development

- Run: `docker-compose down; docker-compose up -d`
- Wait for stack to finish starting up

### Run Playwright Tests

Run: `docker-compose down; docker-compose up -d mysql; sleep 20; docker-compose run --rm app bash -c "npm install; npm run dev & sleep 5; npm run test-e2e-debug"`

## Run Playwright Tests (w/ Stack Reuse)

- Leave dev stack running
- Run in another terminal: `docker-compose exec app npm run test-e2e` (repeat as needed)
- Or: `docker-compose run --rm playwright npx playwright test --debug` (repeat as needed)
- Or: `docker-compose run --rm playwright npx playwright test file.test.js --debug` (repeat as needed)
- Or: `docker-compose run --rm playwright npx playwright test -g "create user" --debug` (repeat as needed)

### Frontend Endpoints

#### Home

/

#### Stores

/stores
/stores/:id

#### Admin Stores

/admin/stores
/admin/stores/new
/admin/stores/:id
/admin/stores/:id/edit

#### Admin Products

/admin/products
/admin/products/new
/admin/products/:id
/admin/products/:id/edit


### Backend Endpoints

#### Store CRUD

```
GET /api/stores
POST /api/stores (admin)

GET /api/stores/:id
PUT /api/stores/:id (admin)
DELETE /api/stores/:id (admin)
```

#### Product CRUD

```
GET /api/products (admin)
GET /api/products/:id (admin)
```

#### Store Product CRUD

```
GET /api/stores/:id/products
POST /api/stores/:id/products (admin)

GET /api/stores/:id/products/:id (admin)
PUT /api/stores/:id/products/:id (admin)
DELETE /api/stores/:id/products/:id (admin)
```

#### Store Summary Retrieval

(Aggregated Product data by Store)

```
GET /api/stores/summary
GET /api/stores/:id/summary
```
