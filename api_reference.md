# API Reference
Last modified: 11/26/2021

## Routes

### GET /
Index

### GET /reservation ?reservationId=<string>
Returns reservation with reservationId
Response Schemas:
- Code: 200, Body: { message: string, reservation: Reservation }
- Code: 400, Body: { message: string, errors: Error[] }, Meaning: Bad Request
- Code: 500, Body: { message: string }, Meaning: Server Error

### DELETE /reservation ?reservationId=<string>
Delete reservation with reservationId
Response Schemas:
- Code: 200, Body: { message: string }
- Code: 400, Body: { message: string, errors: Error[] }, Meaning: Bad Request
- Code: 500, Body: { message: string }, Meaning: Server Error

### POST /reservation ?datetime=<number>&size=<number>
Attempts to create a pending reservation if possible. If successful, returns reservationId.
Response Schemas:
- Code: 200, Body: { message: string, reservationId: reservationId }, Meaning: Successful
- Code: 400, Body: { message: string, errors: Error[] }, Meaning: Bad Request
- Code: 406, Body: { message: string }, Meaning: Reservation not available
- Code: 500, Body: { message: string }, Meaning: Server Error

### POST /reservation/book
Attempts to confirm an existing pending reservation.

Body: {
    "reservationId": string,
    "user": string | User
}

Response Schemas:
- Code: 200, Body: { message: string }, Meaning: Successful
- Code: 400, Body: { message: string, errors: Error[] }, Meaning: Bad Request
- Code: 408, Body: { message: string }, Meaning: Pending reservation timed out
- Code: 500, Body: { message: string }, Meaning: Server Error

### GET /reservations ?userId=<string>
Returns list of all reservations with userId.
Response Schemas:
- Code: 200, Body: { message: string, reservations: Reservation[] }, Meaning: Successful
- Code: 400, Body: { message: string, errors: Error[] }, Meaning: Bad Request
- Code: 500, Body: { message: string }, Meaning: Server Error

### GET /reservations/all
Returns list of all reservations.
Response Schemas:
- Code: 200, Body: { message: string, reservations: Reservation[] }, Meaning: Successful
- Code: 500, Body: { message: string }, Meaning: Server Error