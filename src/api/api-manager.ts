import { Observable } from "rxjs";
import { ApiService } from "./api-service";

import Reservation from "../data/reservation-data";
import User from "../data/user-data";

class ApiManager {

    private static reservations: Reservation[];
    private static users: User[];

    public static fetchReservations(): Observable<any> {
        const observable: Observable<any> = ApiService.getReservations();
        observable.subscribe({
            next: ret => {
                this.loadReservations(ret.data);
            },
            error: err => {
                console.log('ApiManager.getReservations: Could not fetch reservations');
            }
        });
        return observable;
    }

    public static fetchUsers() {
        const observable: Observable<any> = ApiService.getUsers();
        observable.subscribe({
            next: ret => {
                this.loadUsers(ret.data);
            },
            error: err => {
                console.log('ApiManager.getUsers: Could not fetch users');
            }
        });
        return observable;
    }

    private static loadReservations(data: any) {
        console.log('ApiManager.loadReservations: data=', data);
        const reservationsList: Reservation[] = [];
        for (const reservationData of data) {
            const reservation = new Reservation();
            reservation.id = reservationData.id;
            reservation.createTime = reservationData.createTime;
            reservation.guests = reservationData.guests;
            reservation.startTime = reservationData.startTime;
            reservation.status = reservationData.status;

            const userData = reservationData.user;
            const user = new User();

            if (typeof reservationData.user === 'number') {
                user.id = userData;
            }

            else if(typeof reservationData.user === 'object') {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.phoneNumber = userData.phoneNumber;
                user.email = userData.email;
                user.memberPoints = userData.memberPoints;
            }

            else {
                console.log('ApiManager.loadReservations: User type not recognized. User = ', reservationData.user);
            }

            reservation.user = user;

            reservationsList.push(reservation);
        }
        this.reservations = reservationsList;
    }

    private static loadUsers(data: any) {
        console.log('ApiManager.loadUsers: data=', data);
        const userList: User[] = [];
        for (const userData of data) {
            const user = new User();
            user.id = userData.id;
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.phoneNumber = userData.phoneNumber;
            user.email = userData.email;
            user.memberPoints = userData.memberPoints;
            userList.push(user);
        }
        this.users = userList;
    }

    public static getReservations() { return this.reservations; }

    public static getUsers() { return this.users; }

}

export default ApiManager;