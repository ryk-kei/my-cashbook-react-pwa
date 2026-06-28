import { InputGroup, NumberInput } from "@chakra-ui/react";
import { MdMoney } from "react-icons/md";

type Props = {
  amount: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
};

const AmountField = (props: Props) => {
  const { amount, onChange, readOnly } = props;

  return (
    <>
      <NumberInput.Root
        variant={"flushed"}
        min={0}
        pattern="[0-9]*(.[0-9]+)?"
        required
        value={amount.toString()}
        onValueChange={(detail) => {
          const num = detail.valueAsNumber;
          onChange(Number.isNaN(num) ? 0 : num);
        }}
        disabled={readOnly}
      >
        <NumberInput.Control />
        <InputGroup startElement={<MdMoney />}>
          <NumberInput.Input placeholder="金額" />
        </InputGroup>
      </NumberInput.Root>
    </>
  );
};

export default AmountField;
