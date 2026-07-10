import type { ItemDictionary } from "../types/itemdictionary";
import { bulkDeleteInsertEntry } from "./itemDictionary";

// CSVインポートファイル添付
export const importFile = (files: File[]): void => {
  const file = files[0];
  if (!file) {
    alert("ファイルを選択してください。");
    return;
  }

  const fileType: string = (file.name.split(".").pop() ?? "").toLowerCase();
  const reader: FileReader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (fileType === "csv" || fileType === "txt") {
      // CSV形式
      importCsv(e);
    } else {
      alert("CSVファイルを選択してください。");
    }
  };
  reader.readAsText(file);
};

const importCsv = (e: ProgressEvent<FileReader>): void => {
  const content = (e.target as FileReader).result as string;
  const rows = content.split(/\r?\n/).map((row) => row.split(","));
  const entries: Omit<ItemDictionary, "id">[] = rows.slice(1).map((row) => ({
    name: row[0],
  }));

  bulkDeleteInsertEntry(entries)
    .then(() => {
      alert("CSVデータのインポートが完了しました！");
    })
    .catch((error) => {
      alert(
        "CSVインポート中にエラーが発生しました。処理はロールバックされました。" +
          "\n" +
          error,
      );
      console.error("CSVインポート中にエラー:", error);
    });
};
