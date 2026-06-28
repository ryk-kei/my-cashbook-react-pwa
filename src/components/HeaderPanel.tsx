import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import type { CashBookProps } from "../types/cashbook";
import { formatCurrency, getSignedAmount } from "./comFunc";

type Props = {
  cashbookList: CashBookProps[];
  visible: boolean;
  onToggle: () => void;
};

type CashbookSummary = {
  income: number;
  expense: number;
  total: number;
};

const HeaderPanel = (props: Props) => {
  const { cashbookList, visible, onToggle } = props;

  const summary: CashbookSummary = cashbookList.reduce(
    (acc, cb) => {
      const signed = getSignedAmount(cb.isIncome, cb.amount);

      if (cb.isIncome) {
        acc.income += cb.amount;
      } else {
        acc.expense += cb.amount;
      }

      acc.total += signed;
      return acc;
    },
    { income: 0, expense: 0, total: 0 },
  );

  return (
    <>
      <Button
        aria-label="toggle"
        variant={"plain"}
        size={"xl"}
        bg={"teal.600"}
        onClick={onToggle}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          direction={"row"}
          w="100%"
        >
          {visible ? <MdVisibility /> : <MdVisibilityOff />}
          <Flex
            direction={"column"}
            fontSize={"xs"}
            lineHeight="1"
            align={"start"}
          >
            {visible ? (
              <>
                <Flex direction={"row"} justify={"space-between"}>
                  <Box>
                    <Text>収入：</Text>
                    <Text>支出：</Text>
                    <Text>残高：</Text>
                  </Box>
                  <Box
                    justifyItems={"right"}
                    fontFamily="'Roboto Mono', monospace"
                  >
                    <Text>{formatCurrency(summary.income)}</Text>
                    <Text>{formatCurrency(summary.expense)}</Text>
                    <Text>{formatCurrency(summary.total)}</Text>
                  </Box>
                </Flex>
              </>
            ) : (
              <>
                <Text>{"＊".repeat(5)}</Text>
                <Text>{"＊".repeat(5)}</Text>
                <Text>{"＊".repeat(5)}</Text>
              </>
            )}
          </Flex>
        </Flex>
      </Button>
    </>
  );
};

export default HeaderPanel;
