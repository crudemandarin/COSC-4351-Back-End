import Reservation from "../src/data/reservation-data";

test('1:00AM intersects w/ 1:00AM', () => {
    const startTime = (new Date(2000, 1, 1, 1)).getTime(); // 1/1/2000 @ 1 AM
    const rA = new Reservation();
    rA.startTime = startTime;
    const rB = new Reservation();
    rB.startTime = startTime;
    expect(rA.isIntersecting(rB)).toBe(true);
});

test('1:00AM intersects w/ 1:30AM', () => {
    const rA = new Reservation();
    rA.startTime = (new Date(2000, 1, 1, 1)).getTime(); // 1/1/2000 @ 1 AM;
    const rB = new Reservation();
    rB.startTime = (new Date(2000, 1, 1, 1, 30)).getTime(); // 1/1/2000 @ 1:30 AM;
    expect(rA.isIntersecting(rB)).toBe(true);
});

test('1:30AM intersects w/ 1:00AM', () => {
    const rA = new Reservation();
    rA.startTime = (new Date(2000, 1, 1, 1, 30)).getTime(); // 1/1/2000 @ 1 AM;
    const rB = new Reservation();
    rB.startTime = (new Date(2000, 1, 1, 1)).getTime(); // 1/1/2000 @ 1:30 AM;
    expect(rA.isIntersecting(rB)).toBe(true);
});

test('1:00AM intersects w/ 3:00AM', () => {
    const rA = new Reservation();
    rA.startTime = (new Date(2000, 1, 1, 1)).getTime(); // 1/1/2000 @ 1 AM;
    const rB = new Reservation();
    rB.startTime = (new Date(2000, 1, 1, 3)).getTime(); // 1/1/2000 @ 3:00 AM;
    expect(rA.isIntersecting(rB)).toBe(false);
});

test('1:00AM intersects w/ 5:00AM', () => {
    const rA = new Reservation();
    rA.startTime = (new Date(2000, 1, 1, 1)).getTime(); // 1/1/2000 @ 1 AM;
    const rB = new Reservation();
    rB.startTime = (new Date(2000, 1, 1, 5)).getTime(); // 1/1/2000 @ 5:00 AM;
    expect(rA.isIntersecting(rB)).toBe(false);
});