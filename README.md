# COSC 4351 Backend

Express TypeScript backend to service cosc-4351-frontend

## Usage

1. Install dependencies
```
npm install
```

2. Create `dist` folder in project root directory

3. Copy `server.js` into `dist`

4. Install JSON Server (temporary)
```
npm install -g json-server
```

5. Start JSON Server
```
json-server -p 4000 --watch mock-server/db.json
```

6. Start server
```
npm start
```