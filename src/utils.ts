class Utils {
    /* Constants */

    // Reservation Statuses
    public static PENDING = 0;
    public static CONFIRMED = 1;
    public static EXPIRED = 2;

    // Configuration
    public static MINIMUM_RESERVATION_SIZE = 1;
    public static MAXIMUM_RESERVATION_SIZE = 6;

    public static RESERVATION_LENGTH = 2*60*60*1000; // 2 hrs in milliseconds

    private static RESTAURANT_TABLES = [2,2,3,3,4,4,5,7,2,5,5,3,6];

    /* Functions */

    public static getAvailableTables(guestList: number[]) {
        let output = Utils.RESTAURANT_TABLES;
        
        let staged: number[] = [];

        // Filter perfect fits
        output = output.filter((num, index) => {
            const flag = guestList.includes(num)
            if (flag) staged.push(index);
            return !flag;
        });

        // Remove spent guests
        for (let x = staged.length - 1; x >= 0; x--) guestList.splice(staged[x], 1);

        console.log(`Round 1\noutput=${output}\nguestList=${guestList}`);

        // Filter combinations
        // TODO

        return output;
    }
}

export default Utils;