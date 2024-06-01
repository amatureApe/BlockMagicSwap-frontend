export interface Leg {
    legPosition: boolean;
    feedId: number;
    originalPrice: string;
    lastPrice: string;
    balance: number;
    withdrawable: number;
}

export interface Period {
    startDate: number;
    periodInterval: number;
    totalIntervals: number;
    intervalCount: number;
}

export interface SwapContract {
    contractMasterId: number;
    contractId: number;
    userA: string;
    userB: string;
    period: Period;
    legA: Leg;
    legB: Leg;
    settlementTokenId: number;
    yieldId: number;
    notionalAmount: number;
    yieldShares: number;
    status: number;
}