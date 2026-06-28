import {
  DatePicker,
  parseDate,
  Portal,
  type DateValue,
} from "@chakra-ui/react";
import { CalendarDate } from "@internationalized/date";
import { LuCalendar } from "react-icons/lu";

type Props = {
  datePickerValue: Date;
  onChange: (value: Date) => void;
};

const MonthPicker = (props: Props) => {
  const { datePickerValue: month, onChange } = props;

  const format = (date: DateValue) => {
    const month = date.month.toString().padStart(2, "0");
    const year = date.year.toString();
    return `${month}/${year}`;
  };

  const parse = (string: string) => {
    const fullRegex = /^(\d{1,2})\/(\d{4})$/;
    const fullMatch = string.match(fullRegex);
    if (fullMatch) {
      const [, month, year] = fullMatch.map(Number);
      return new CalendarDate(year, month, 1);
    }
  };
  return (
    <>
      <DatePicker.Root
        format={format}
        parse={parse}
        defaultView="month"
        minView="month"
        placeholder="mm/yyyy"
        value={[parseDate(month)]}
        defaultValue={[parseDate(new Date())]}
        onValueChange={(detail) => {
          onChange(detail.value[0].toDate("Asia/Tokyo"));
        }}
      >
        <DatePicker.Label></DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    </>
  );
};

export default MonthPicker;
