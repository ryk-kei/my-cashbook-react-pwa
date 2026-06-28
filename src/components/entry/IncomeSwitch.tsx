import { CheckboxCard } from "@chakra-ui/react";

type Props = {
  isIncome: boolean;
  onChange: (value: boolean | string) => void;
  readOnly?: boolean;
};

const IncomeSwitch = (props: Props) => {
  const { isIncome, onChange, readOnly } = props;

  return (
    <>
      <CheckboxCard.Root
        checked={isIncome}
        size={"sm"}
        variant={"surface"}
        colorPalette={isIncome ? "blue" : "red"}
        color={isIncome ? "blue" : "red"}
        onCheckedChange={(detail) => onChange(detail.checked)}
        disabled={readOnly}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Context>
            {(context) =>
              context.checked ? (
                <CheckboxCard.Label>収入</CheckboxCard.Label>
              ) : (
                <CheckboxCard.Label>支出</CheckboxCard.Label>
              )
            }
          </CheckboxCard.Context>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </>
  );
};

export default IncomeSwitch;
