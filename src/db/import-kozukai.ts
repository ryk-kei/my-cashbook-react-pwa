import type { CashBookProps } from "../types/cashbook";
import { saveEntry } from "./db";

// こづかい帳のフォーマットに対応
export const importKozukai = (files: File[]): void => {
  const file = files[0];
  if (!file) {
    alert("ファイルを選択してください。");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = (e.target as FileReader).result as string;
    const rows = content.split(/\r?\n/).map((row) => row.split(","));

    // ヘッダー行を確認
    const headers = rows[0];
    if (
      headers[0] !== "日付" ||
      headers[1] !== "項目" ||
      headers[2] !== "収入" ||
      headers[3] !== "支出"
    ) {
      alert(
        "こづかい帳の形式ではありません。正しいファイルを選択してください。",
      );
      return;
    }

    // データ行を処理
    const entries = rows
      .slice(1)
      .filter((row) => row.length === 4)
      .flatMap((row) => {
        const date = new Date(row[0]); // yyyy/mm/dd -> new Date(yyyy/mm/dd) に変換
        const item = row[1].replace(/"/g, ""); // 項目のダブルクォーテーションを除去
        const income = Number(row[2]);
        const expense = Number(row[3]);

        // 収入と支出を個別に処理
        const results: CashBookProps[] = [];
        if (income > 0) {
          results.push({
            id: 0,
            date: date,
            item: item,
            amount: income,
            isIncome: true,
          });
        }
        if (expense > 0) {
          results.push({
            id: 0,
            date: date,
            item: item,
            amount: expense,
            isIncome: false,
          });
        }
        return results;
      });

    // データをIndexedDBに保存
    Promise.all(
      entries.map((entry) => {
        const { id, ...withoutId } = entry;
        return saveEntry(withoutId);
      }),
    )
      .then(() => {
        alert("こづかい帳データのインポートが完了しました！");
      })
      .catch((error) => {
        console.error("インポート中にエラーが発生しました:", error);
        alert("インポートに失敗しました。");
      });
  };
  reader.readAsText(file);
};
