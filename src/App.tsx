import "./App.css";
import { Box, Dialog, Flex, type DateValue } from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { getEntries, saveEntry, updateEntry, deleteEntry } from "./db/db";
import type { CashBookProps } from "./types/cashbook";
import HeaderPanel from "./components/HeaderPanel";
import FooterPanel from "./components/FooterPanel";
import EntryDialog from "./components/entry/EntryDialog";
import CardRow from "./components/CardRow";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

const getCashbook = await getEntries();

function App() {
  const [cashbookList, setCashbookList] =
    useState<CashBookProps[]>(getCashbook);

  const dateSort = (arr: CashBookProps[]) => {
    return arr.sort(
      (a, b) => b.date.getTime() - a.date.getTime() || b.id - a.id,
    );
  };
  const sortedList = useMemo(() => dateSort([...cashbookList]), [cashbookList]);

  // ======================================================
  // 活性・非活性
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible((visible) => !visible);
  };
  // ======================================================

  /**
   * 登録/更新/削除
   * @param cashbook
   * @param mode
   */
  const handleEntry = async (
    cashbook: CashBookProps,
    mode: "create" | "update" | "delete" | "read",
  ) => {
    if (mode === "create") {
      const { id, ...withoutId } = cashbook;
      await saveEntry(withoutId);
    } else if (mode === "update") {
      await updateEntry(cashbook.id, cashbook);
    } else if (mode === "delete") {
      await deleteEntry(cashbook.id);
    }
    const newCashbook = await getEntries();
    setCashbookList(newCashbook);
  };

  const [canEdit, setCanEdit] = useState(false);
  const toggleVisibility = () => {
    setCanEdit((canEdit) => !canEdit);
  };

  // ダイアログ管理
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update" | "delete">("create");
  const [selectedCashBook, setSelectedCashBook] = useState<CashBookProps>({
    id: 0,
    date: new Date(),
    item: "",
    amount: 0,
    isIncome: false,
  } satisfies CashBookProps);

  const handleEditClick = useCallback((c: CashBookProps) => {
    setSelectedCashBook(c);
    setMode("update");
    setDialogOpen(true);
  }, []);

  const handleDeleteClick = useCallback((c: CashBookProps) => {
    setSelectedCashBook(c);
    setMode("delete");
    setDialogOpen(true);
  }, []);

  /**
   * 検索
   * @param isIncome
   * @param range
   * @param item
   */
  const handleSearch = async (
    isIncome: string,
    range: DateValue[],
    item: string,
  ) => {
    let result: CashBookProps[] = await getEntries();
    // 収支検索
    if (isIncome == "true") {
      result = result.filter((x) => x.isIncome);
    } else if (isIncome == "false") {
      result = result.filter((x) => !x.isIncome);
    }
    // 日付範囲検索
    if (range.length > 0) {
      const [from, to] = range;
      result = result.filter((x) => {
        const d = x.date;
        if (from) {
          if (d < from.toDate("Asia/Tokyo")) return false;
        }
        // to がある場合は d <= to
        if (to) {
          if (d > to.toDate("Asia/Tokyo")) return false;
        }
        return true;
      });
    }
    // 項目like検索
    result = result.filter((x) => x.item.includes(item));
    setCashbookList(result);
  };

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  /**
   * HOME
   */
  const handleHome = async () => {
    setVisible(false);
    setCanEdit(false);
    setCashbookList(await getEntries());
    // スクロールを先頭へ戻す
    virtuosoRef.current?.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "auto",
    });
  };

  return (
    <>
      <Flex direction="column" height="100vh">
        <HeaderPanel
          cashbookList={cashbookList}
          visible={visible}
          onToggle={() => handleVisible()}
        />

        {/* 参照 */}
        <Box flex="1" overflowY="hidden">
          <Virtuoso
            ref={virtuosoRef}
            style={{ height: "100%" }}
            totalCount={sortedList.length}
            itemContent={(index) => (
              <CardRow
                key={sortedList[index].id}
                cashbook={sortedList[index]}
                visible={visible}
                canEdit={canEdit}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            )}
          />
        </Box>

        {/* 入力パネル */}
        <FooterPanel
          onHome={handleHome}
          onSearch={handleSearch}
          onEntry={handleEntry}
          onEdit={toggleVisibility}
        />
      </Flex>

      {/* ダイアログ */}
      <>
        <Dialog.Root
          open={dialogOpen}
          onOpenChange={(details) => setDialogOpen(details.open)}
        >
          <EntryDialog
            mode={mode}
            cashBook={selectedCashBook}
            onClick={(updatedCashBook) => {
              handleEntry(updatedCashBook, mode);
              setDialogOpen(false);
            }}
          />
        </Dialog.Root>
      </>
    </>
  );
}

export default App;
