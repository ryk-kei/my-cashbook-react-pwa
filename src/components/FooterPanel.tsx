import {
  Box,
  Dialog,
  Flex,
  IconButton,
  type DateValue,
} from "@chakra-ui/react";
import EntryDialog from "./entry/EntryDialog";
import { MdCalendarMonth, MdEdit, MdHome, MdSearch } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImDatabase } from "react-icons/im";
import type { CashBookProps } from "../types/cashbook";
import { IODialog } from "./io/IODialog";
import { SearchDialog } from "./search/SearchDialog";
import CalendarDialog from "./calendar/CalendarDialog";

const defaultCashBook: CashBookProps = {
  id: 0,
  date: new Date(),
  item: "",
  amount: 0,
  isIncome: false,
};

type Props = {
  onHome?: () => void;
  onSearch?: (isIncome: string, range: DateValue[], item: string) => void;
  onEntry: (
    cashBook: CashBookProps,
    mode: "create" | "update" | "delete" | "read",
  ) => void;
  onEdit: () => void;
};

const FooterPanel = (props: Props) => {
  const { onHome, onSearch, onEntry, onEdit } = props;

  return (
    <>
      <Box paddingBlock={"8px"} bg={"gray.400"}>
        <Flex justify="space-around">
          <IconButton aria-label="ホーム" onClick={onHome}>
            <MdHome />
          </IconButton>

          {/* カレンダーダイアログ */}
          <Dialog.Root size="full">
            <Dialog.Trigger asChild>
              <IconButton aria-label="月表示">
                <MdCalendarMonth />
              </IconButton>
            </Dialog.Trigger>
            <CalendarDialog />
          </Dialog.Root>

          {/* 検索ダイアログ */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton aria-label="検索">
                <MdSearch />
              </IconButton>
            </Dialog.Trigger>
            <SearchDialog onSearch={onSearch} />
          </Dialog.Root>

          {/* 登録ダイアログ */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton aria-label="登録">
                <MdEdit />
              </IconButton>
            </Dialog.Trigger>
            <EntryDialog
              mode="create"
              cashBook={defaultCashBook}
              onClick={onEntry}
            />
          </Dialog.Root>

          {/* 編集活性ボタン */}
          <IconButton aria-label="編集" onClick={() => onEdit()}>
            <FaEdit />
          </IconButton>

          {/* 入出力ダイアログ */}
          <Dialog.Root onOpenChange={() => onEntry(defaultCashBook, "read")}>
            <Dialog.Trigger asChild>
              <IconButton aria-label="入出力">
                <ImDatabase />
              </IconButton>
            </Dialog.Trigger>
            <IODialog />
          </Dialog.Root>
        </Flex>
      </Box>

      <Box padding={2} borderBottomRadius={"2xl"} bg={"gray.300"} />
    </>
  );
};

export default FooterPanel;
