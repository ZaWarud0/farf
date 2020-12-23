export const getNewReqNo = (oldReq: string) => {
    const newReq = oldReq.split("/");
    if (new Date().getFullYear() !== +newReq[1]) {
        newReq[1] = (+newReq[1] + 1).toString();
        newReq[2] = "1"
    }
    newReq[2] = (+newReq[2] + 1).toString();
    return newReq.join("/");
}

export const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  };