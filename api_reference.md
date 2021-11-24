# API Reference
Last modified: 11/19/2021

## Routes

### GET /
Index

### GET /reservation ?datetime=<number>&size=<number>
Attempts to create a pending reservation if possible. If successful, returns reservationId.
Response Schemas:
- Code: 200, Body: { message: string, reservationId: reservationId }, Meaning: Successful
- Code: 400, Body: { message: string }, Meaning: Bad Request
- Code: 406, Body: { message: string }, Meaning: Reservation not available
- Code: 500, Body: { message: string }, Meaning: Server Error

### GET /reservation/book ?reservationId=<reservationId>
Attempts to confirm an existing pending reservation.
Response Schemas:
- Code: 200, Body: { message: string, reservationId: reservationId }, Meaning: Successful
- Code: 400, Body: { message: string }, Meaning: Bad Request
- Code: 408, Body: { message: string }, Meaning: Pending reservation timed out
- Code: 500, Body: { message: string }, Meaning: Server Error

### GET /reservations
Returns list of all reservations.
Response Schemas:
- Code: 200, Body: { message: string, reservations: Reservation[] }, Meaning: Successful
- Code: 400, Body: { message: string }, Meaning: Bad Request
- Code: 500, Body: { message: string }, Meaning: Server Error

### GET /users (TEMPORARY)
Returns list of all users.
Response Schemas:
- Code: 200, Body: { message: string, users: User[] }, Meaning: Successful
- Code: 500, Body: { message: string }, Meaning: Server Error