import type { CashBookProps } from "../../types/cashbook";
import AmountField from "./AmountField";
import DateField from "./DateField";
import IncomeSwitch from "./IncomeSwitch";
import ItemField from "./ItemField";

type Props = {
  cashBook: CashBookProps;
  handleChange: (cashBookPropName: string, value: any) => void;
  readOnly?: boolean;
};

const EntryForm = (props: Props) => {
  const { cashBook, handleChange, readOnly } = props;

  return (
    <>
      <IncomeSwitch
        isIncome={cashBook.isIncome}
        onChange={(v) => handleChange("isIncome", v)}
        readOnly={readOnly}
      />

      <ItemField
        item={cashBook.item}
        onChange={(v) => handleChange("item", v)}
        readOnly={readOnly}
      />

      <DateField
        date={cashBook.date}
        onChange={(v) => handleChange("date", v)}
        readOnly={readOnly}
      />

      <AmountField
        amount={cashBook.amount}
        onChange={(v) => handleChange("amount", v)}
        readOnly={readOnly}
      />
    </>
  );
};

export default EntryForm;
