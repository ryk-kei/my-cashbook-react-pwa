import { DatePicker, InputGroup, parseDate, Portal } from "@chakra-ui/react";
import { MdCalendarMonth, MdEditCalendar } from "react-icons/md";

type Props = {
  date: Date;
  onChange: (value: Date) => void;
  readOnly?: boolean;
};

const DateField = (props: Props) => {
  const { date, onChange, readOnly } = props;

  return (
    <>
      <DatePicker.Root
        variant="flushed"
        value={[parseDate(date)]}
        onValueChange={(detail) => {
          onChange(detail.value[0].toDate("Asia/Tokyo"));
        }}
        disabled={readOnly}
      >
        <DatePicker.Label />

        <InputGroup
          as={DatePicker.Control}
          startElement={<MdEditCalendar />}
          endElement={
            <DatePicker.Context>
              {(context) =>
                context.value.length ? (
                  // <DatePicker.ClearTrigger />
                  <DatePicker.Trigger>
                    <MdCalendarMonth />
                  </DatePicker.Trigger>
                ) : (
                  <DatePicker.Trigger>
                    <MdCalendarMonth />
                  </DatePicker.Trigger>
                )
              }
            </DatePicker.Context>
          }
        >
          <DatePicker.Input />
        </InputGroup>

        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable />
              </DatePicker.View>
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

export default DateField;
