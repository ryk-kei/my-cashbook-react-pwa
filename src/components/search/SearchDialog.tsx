import {
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  Input,
  InputGroup,
  Portal,
  RadioGroup,
  Stack,
  type DateValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { MdShoppingCart } from "react-icons/md";

type Props = {
  onSearch?: (isIncome: string, range: DateValue[], item: string) => void;
};

export const SearchDialog = (props: Props) => {
  const { onSearch } = props;
  const [isIncome, setIsIncome] = useState("");
  const [range, setRange] = useState<DateValue[]>([]);
  const [item, setItem] = useState("");

  const onClick = () => {
    if (onSearch) onSearch(isIncome, range, item);
  };

  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title>検索フォーム</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Stack gap={4} maxWidth="20rem">
              {/* 収支 */}
              <RadioGroup.Root
                size={"lg"}
                variant={"outline"}
                value={isIncome}
                onValueChange={(v) =>
                  setIsIncome(v.value == null ? "" : v.value)
                }
              >
                <HStack gap="6">
                  <RadioGroup.Item key={"0"} value={""}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>なし</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item key={"1"} value="true" colorPalette={"blue"}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>収入</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item key={"2"} value="false" colorPalette={"red"}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>支出</RadioGroup.ItemText>
                  </RadioGroup.Item>
                </HStack>
              </RadioGroup.Root>

              {/* 日付 */}
              <DatePicker.Root
                selectionMode="range"
                maxWidth="20rem"
                value={range}
                onValueChange={(detail) => setRange(detail.value)}
              >
                <DatePicker.Control>
                  <DatePicker.Input index={0} />
                  <DatePicker.Input index={1} />
                  <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                      <LuCalendar />
                    </DatePicker.Trigger>
                  </DatePicker.IndicatorGroup>
                </DatePicker.Control>
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

              {/* 項目 */}
              <InputGroup
                startElement={<MdShoppingCart />}
                endElement={
                  <Button size={"sm"} onClick={() => alert(`項目辞書`)}>
                    項目辞書
                  </Button>
                }
              >
                <Input
                  placeholder="項目"
                  variant="flushed"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </InputGroup>

              {/* 金額 */}
            </Stack>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">キャンセル</Button>
            </Dialog.ActionTrigger>
            <Button
              bgColor={"green.500"}
              onClick={() => {
                setIsIncome("");
                setRange([]);
                setItem("");
              }}
            >
              クリア
            </Button>

            <Dialog.ActionTrigger asChild>
              <Button bgColor={"green.500"} onClick={() => onClick()}>
                検索
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};
