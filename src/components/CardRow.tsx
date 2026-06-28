import { Box, Card, Flex, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { memo } from "react";
import type { CashBookProps } from "../types/cashbook";
import { formatCurrency, formatYmd, getSignedAmount } from "./comFunc";

type Props = {
  cashbook: CashBookProps;
  visible: boolean;
  canEdit: boolean;
  onEdit: (c: CashBookProps) => void;
  onDelete: (c: CashBookProps) => void;
};

const CardRow = memo(function CardRow({
  cashbook,
  visible,
  canEdit,
  onEdit,
  onDelete,
}: Props) {
  const signedAmount = getSignedAmount(cashbook.isIncome, cashbook.amount);

  return (
    <Card.Root
      marginBlock={"2px"}
      size="sm"
      borderLeftWidth={"thick"}
      borderLeftColor={cashbook.isIncome ? "blue.400" : "red.400"}
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

      <Card.Footer justifyContent={"end"} paddingBottom={"4px"}>
        <IconButton
          aria-label="更新"
          size="xs"
          maxBlockSize={"min"}
          disabled={!canEdit}
          onClick={() => onEdit(cashbook)}
        >
          <MdEdit />
        </IconButton>

        <IconButton
          aria-label="削除"
          size="xs"
          maxBlockSize={"min"}
          disabled={!canEdit}
          onClick={() => onDelete(cashbook)}
        >
          <MdDelete />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
});

export default CardRow;
