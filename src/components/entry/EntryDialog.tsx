import { Button, CloseButton, Dialog } from "@chakra-ui/react";
import type { CashBookProps } from "../../types/cashbook";
import { useCallback, useEffect, useState } from "react";
import EntryForm from "./EntryForm";

type Props = {
  mode: "create" | "update" | "delete";
  cashBook: CashBookProps;
  onClick: (cashBook: CashBookProps, mode: Props["mode"]) => void;
};

const EntryDialog = (props: Props) => {
  const [cashBook, setCashBook] = useState<CashBookProps>(props.cashBook);
  useEffect(() => {
    setCashBook(props.cashBook);
  }, [props.cashBook]);
  const { mode, onClick } = props;

  const isReadOnly = mode === "delete";

  const actionLabel =
    mode === "create" ? "登録" : mode === "update" ? "更新" : "削除";

  const handleChange = useCallback(
    (cashBookPropName: string, value: any) => {
      if (isReadOnly) return; // 削除モードでは編集不可
      setCashBook((pre) => ({
        ...pre,
        [cashBookPropName]: value,
      }));
    },
    [cashBook, mode],
  );

  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title>{actionLabel}フォーム</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <EntryForm
              cashBook={cashBook}
              handleChange={handleChange}
              readOnly={isReadOnly}
            />
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">キャンセル</Button>
            </Dialog.ActionTrigger>

            <Dialog.ActionTrigger asChild>
              <Button
                bgColor={mode === "delete" ? "red.500" : "blue.500"}
                onClick={() => onClick(cashBook, mode)}
              >
                {actionLabel}
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};

export default EntryDialog;
