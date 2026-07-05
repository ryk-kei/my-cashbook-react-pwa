import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CloseButton,
  Dialog,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import type { CashBookProps } from "../../types/cashbook";
import { getEntries } from "../../db/db";
import HeaderPanel from "../HeaderPanel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MonthPicker from "./MonthPicker";
import { formatCurrency, formatYmd, getSignedAmount } from "../comFunc";

const getCashbook = await getEntries();

/**
 * 任意の月開始日を基準に、指定年月の範囲でフィルタする
 *
 * @param selectedDate 指定年月
 * @param all 検索対象
 * @returns 検索結果
 */
const filterCashBookByMonth = (selectedDate: Date, all: CashBookProps[]) => {
  // 月の開始日
  const START_DATE = 10;
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // 日付範囲検索
  // 範囲開始：対象年月の START_DAY
  const rangeStart = new Date(year, month, START_DATE);
  // 範囲終了：翌月の START_DAY - 1
  const rangeEnd = new Date(year, month + 1, START_DATE - 1);

  return all.filter((x) => rangeStart <= x.date && x.date <= rangeEnd);
};

const CalendarDialog = () => {
  const [cashbookList, setCashbookList] = useState<CashBookProps[]>([]);

  const [month, setMonth] = useState(new Date());
  const handleChange = (month: Date) => {
    setMonth(month);
    setCashbookList(filterCashBookByMonth(month, getCashbook));
  };

  const shiftMonth = (base: Date, diff: number) => {
    const d = new Date(base);
    d.setMonth(d.getMonth() + diff);
    handleChange(d);
  };

  const handlePrevMonth = (month: Date) => {
    shiftMonth(month, -1);
  };

  const handleNextMonth = (month: Date) => {
    shiftMonth(month, +1);
  };

  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible((visible) => !visible);
  };

  const dateSort = (arr: CashBookProps[]) => {
    return arr.sort(
      (a, b) => b.date.getTime() - a.date.getTime() || b.id - a.id,
    );
  };
  const sortedList = useMemo(() => dateSort([...cashbookList]), [cashbookList]);

  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>

          <Dialog.Header></Dialog.Header>

          <Dialog.Body padding={0}>
            <MonthPicker datePickerValue={month} onChange={handleChange} />
            <Flex direction="row" width="100%">
              <Box>
                <IconButton
                  color={"black"}
                  bgColor={"gray.300"}
                  height={"100%"}
                  onClick={() => handlePrevMonth(month)}
                >
                  <FaAngleLeft />
                </IconButton>
              </Box>
              <Box width={"100%"}>
                <Flex direction="column" height="85vh">
                  <HeaderPanel
                    cashbookList={cashbookList}
                    visible={visible}
                    onToggle={() => handleVisible()}
                  />
                  <Box flex="1" overflowY="auto">
                    {sortedList.map((cashbook) => {
                      // 支出の場合、金額に"-"を付与する
                      const signedAmount = getSignedAmount(
                        cashbook.isIncome,
                        cashbook.amount,
                      );

                      return (
                        <Card.Root
                          marginBlock={"2px"}
                          key={cashbook.id}
                          size="sm"
                          borderLeftWidth={"thick"}
                          borderLeftColor={
                            cashbook.isIncome ? "blue.400" : "red.400"
                          }
                        >
                          <Card.Header
                            bgColor={cashbook.isIncome ? "blue.400" : "red.400"}
                            fontSize="xs"
                            fontWeight="light"
                            paddingBlock={"4px"}
                          >
                            {formatYmd(cashbook.date)}
                          </Card.Header>

                          <Card.Body paddingBlock={"4px"}>
                            <Flex align="center" justify="space-between">
                              <Box>{cashbook.item}</Box>
                              <Box>
                                {!visible && cashbook.isIncome
                                  ? "＊".repeat(5)
                                  : formatCurrency(signedAmount)}
                              </Box>
                            </Flex>
                          </Card.Body>

                          <Card.Footer
                            justifyContent={"end"}
                            paddingBottom={"4px"}
                          ></Card.Footer>
                        </Card.Root>
                      );
                    })}
                  </Box>
                </Flex>
              </Box>
              <Box>
                <IconButton
                  color={"black"}
                  bgColor={"gray.300"}
                  height={"100%"}
                  onClick={() => handleNextMonth(month)}
                >
                  <FaAngleRight />
                </IconButton>
              </Box>
            </Flex>
          </Dialog.Body>

          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};

export default CalendarDialog;
