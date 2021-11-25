class Utils {
    /* Constants */

    // Reservation Statuses
    public static PENDING = 0;
    public static CONFIRMED = 1;
    public static EXPIRED = 2;

    // Configuration
    public static MINIMUM_RESERVATION_SIZE = 1;
    public static MAXIMUM_RESERVATION_SIZE = 12;

    public static RESERVATION_LENGTH = 2*60*60*1000; // 2 hrs in ms

    private static RESTAURANT_TABLES = [2,2,3,3,4,4,5,7,2,5,5,3,6];

    /* Functions */

    private static descending(a: number, b: number) {
        return b - a;
    }

    // NEEDS WORK -- INVALID
    public static isTableAvailable(guestList: number[], tableList: number[] = Utils.RESTAURANT_TABLES) {

        // Guest list has more elements than table list
        if (guestList.length > tableList.length) return false;

        console.log('Round 0: Input'
                    + `\n--> tableList = [${tableList}]`
                    + `\n--> guestList = [${guestList}]`);

        // Remove Perfect Fits
        for (let x = tableList.length - 1; x >= 0; x--) {
            const table = tableList[x];
            for (let y = guestList.length - 1; y >= 0; y--) {
                const guest = guestList[y];
                if (table === guest) {
                    guestList.splice(y, 1);
                    tableList.splice(x, 1);
                    break;
                }
            }
        }

        console.log('Round 1: Removed Perfect Fits'
                    + `\n--> tableList = [${tableList}]`
                    + `\n--> guestList = [${guestList}]`);

        // Remove Less Than Fits
        for (let x = tableList.length - 1; x >= 0; x--) {
            const table = tableList[x];
            for (let y = guestList.length - 1; y >= 0; y--) {
                const guest = guestList[y];
                if (guest < table) {
                    guestList.splice(y, 1);
                    tableList.splice(x, 1);
                    break;
                }
            }
        }

        console.log('Round 2: Removed Less Than Fits'
                    + `\n--> tableList = [${tableList}]`
                    + `\n--> guestList = [${guestList}]`);

        // Remove Combinatory Fits
        for (let x = guestList.length - 1; x >= 0; x--) {
            const guest = guestList[x];
            const t1 = tableList[tableList.length - 1];
            for (let y = tableList.length - 2; y >= 0; y--) {
                const t2 = tableList[y];
                if (guest <= t1 + t2) {
                    guestList.splice(y, 1);
                    tableList.splice(x, 1);
                    break;
                }
            }
        }

        console.log('Round 3: Removed Combinatory Fits'
                    + `\n--> tableList = [${tableList}]`
                    + `\n--> guestList = [${guestList}]`);

        return guestList.length === 0;
    }
}

export default Utils;