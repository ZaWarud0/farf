/**
 * Returns a new reqNo by incrementing the oldReq
 * @remarks - Increments the YEAR if necessary else only number
 * @param oldReq - the reqNo of the format RN/YEAR/NO
 * @returns an string of format RN/YEAR/NO
 */
export const getNewReqNo = (oldReq: string) => {
    const newReq = oldReq.split("/");
    if (new Date().getFullYear() !== +newReq[1]) {
        newReq[1] = (+newReq[1] + 1).toString();
        newReq[2] = "1"
    }
    newReq[2] = (+newReq[2] + 1).toString();
    return newReq.join("/");
}

/**
 * Returns the current date in the format YYYY/mm/dd
 * @returns a string of the format YYYY/mm/dd
 */
export const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    };