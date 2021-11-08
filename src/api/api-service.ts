import axios from 'axios';
import { from, Observable } from 'rxjs';

export class ApiService {
    private static SERVICE_URL = 'http://localhost:3000/';

    public static getReservations(): Observable<any> {
        return from( axios.get(this.SERVICE_URL + 'reservations') );
    }

    public static getUsers(): Observable<any> {
        return from( axios.get(this.SERVICE_URL + 'users') );
    }
}