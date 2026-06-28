import type { CashBookProps } from "../types/cashbook";
import { getEntries, saveEntry } from "./db";

// JSONエクスポートボタン押下
export const exportJson = async () => {
  const entries = await getEntries();

  // データをJSON形式に変換
  const jsonData = JSON.stringify(entries, null, 2); // JSON文字列を整形
  return jsonData;
};

// CSVエクスポートボタン押下
export const exportCsv = async () => {
  const entries = await getEntries();

  // ヘッダー行を作成
  const headers = ["日付", "項目", "金額", "収支"];
  const rows = [headers];

  // データ行を作成
  entries.forEach((entry) => {
    const row = [
      formatYmd(entry.date),
      entry.item,
      entry.amount.toString(),
      String(entry.isIncome),
    ];
    rows.push(row);
  });

  // CSV形式に変換
  const csvContent = rows.map((e) => e.join(",")).join("\n");
  return "\uFEFF" + csvContent;
};

/**
 * ファイル名生成
 * @param {*} extension
 * @returns yyyymmdd_hhmmss_接尾辞.拡張子
 */
export const generateFileName = (extension: string): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const appName = "cashbook";

  return `${year}${month}${day}_${hours}${minutes}${seconds}_${appName}.${extension}`;
};

const formatYmd = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
};

// JSON/CSVインポートファイル添付
export const importFile = (files: File[]): void => {
  const file = files[0];
  if (!file) {
    alert("ファイルを選択してください。");
    return;
  }

  const fileType: string = (file.name.split(".").pop() ?? "").toLowerCase();
  const reader: FileReader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (fileType === "csv") {
      // CSV形式
      importCsv(e);
    } else if (fileType === "json") {
      // JSON形式
      importJson(e);
    } else {
      alert("CSVまたはJSONファイルを選択してください。");
    }
  };
  reader.readAsText(file);
};

const importCsv = (e: ProgressEvent<FileReader>): void => {
  const content = (e.target as FileReader).result as string;
  const rows = content.split("\n").map((row) => row.split(","));
  const entries: CashBookProps[] = rows.slice(1).map((row) => ({
    id: 0,
    date: new Date(row[0]),
    item: row[1],
    amount: Number(row[2]),
    isIncome: row[3] === "true",
  }));

  Promise.all(
    entries.map((entry) => {
      const { id, ...withoutId } = entry;
      return saveEntry(withoutId);
    }),
  )
    .then(() => {
      alert("CSVデータのインポートが完了しました！");
    })
    .catch((error) => console.error("CSVインポート中にエラー:", error));
};

const importJson = (e: ProgressEvent<FileReader>): void => {
  try {
    const entries: CashBookProps[] = JSON.parse(
      (e.target as FileReader).result as string,
      (key, value) => {
        key;
        // ISO8601 形式なら Date に変換
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          return new Date(value);
        }
        return value;
      },
    );

    Promise.all(
      entries.map((entry) => {
        const { id, ...withoutId } = entry;
        return saveEntry(withoutId);
      }),
    )
      .then(() => {
        alert("JSONデータのインポートが完了しました！");
      })
      .catch((error) => console.error("JSONインポート中にエラー:", error));
  } catch (error) {
    alert("JSONファイルが正しくありません。");
    console.error("JSONパースエラー:", error);
  }
};
