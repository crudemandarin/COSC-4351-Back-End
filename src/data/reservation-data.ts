import Utils from '../utils';
import User from './user-data';

class Reservation {
    public id: number = -1;
    public createTime: number = -1;
    public guests: number = -1;
    public startTime: number = -1;
    public status: number = -1;
    public user: User = undefined;

    /* tslint:disable:no-empty */
    constructor() {}

    isIntersecting(other: Reservation): boolean {
        const lA = this.startTime; const rA = this.startTime + Utils.RESERVATION_LENGTH;
        const rB = other.startTime; const lB = other.startTime + Utils.RESERVATION_LENGTH;
        return (lA < rB) && (rA > lB);
    }
}

export default Reservation;