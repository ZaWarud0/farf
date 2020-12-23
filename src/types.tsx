export type AssetFormRow = {
    no: number,
    budgetCode: string,
    quantity: number,
    description: string,
    budgetedAmount: number,
    location: string,
    assetPRID: string,
    assetCode: string
}

export type AssetForm = {
    date: Date;
    division: string;
    reqNo: string;
    remarks?: string;
    data: Array<AssetFormRow>;
    approvedBy: string;
    preparedBy: string;
}