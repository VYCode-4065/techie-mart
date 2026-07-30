export default function AmountBeforeDiscountConverter(amount: number, discount: number): number {
    return Number((amount / (1 - (discount / 100))).toFixed(2));
}
