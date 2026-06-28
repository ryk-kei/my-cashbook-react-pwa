/**
 * 支出の場合、金額に"-"を付与する
 *
 * @param isIncome
 * @param amount
 * @returns
 */
export const getSignedAmount = (isIncome: boolean, amount: number): number =>
  isIncome ? amount : -amount;

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(value);

export const formatYmd = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
};
