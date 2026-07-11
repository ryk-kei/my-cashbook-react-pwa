import {
  createListCollection,
  IconButton,
  Input,
  InputGroup,
  Popover,
  Portal,
  Select,
} from "@chakra-ui/react";
import { MdMenuBook, MdShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { getEntries } from "../../db/itemDictionary";
import type { ItemDictionary } from "../../types/itemdictionary";

type Props = {
  item: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

const ItemField = ({ item, onChange, readOnly }: Props) => {
  const [query, setQuery] = useState(item);
  const [dictionary, setDictionary] = useState<ItemDictionary[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const all: ItemDictionary[] = await getEntries();
      setDictionary([...all]);
    })();
  }, []);

  const filtered = [
    { label: "--初期化--", value: "" }, // 先頭に空白
    ...dictionary
      .filter((d) => (query ? d.name.includes(query) : true))
      .map((v) => ({ label: v.name, value: v.name })),
  ];

  return (
    <Popover.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      positioning={{ sameWidth: false }}
    >
      <InputGroup
        startElement={<MdShoppingCart />}
        endElement={
          <Popover.Trigger asChild>
            <IconButton size={"sm"} disabled={readOnly}>
              <MdMenuBook />
            </IconButton>
          </Popover.Trigger>
        }
      >
        <Input
          placeholder="項目"
          variant="flushed"
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            onChange(v);
          }}
          disabled={readOnly}
        />
      </InputGroup>

      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>
              <Select.Root
                collection={createListCollection({ items: filtered })}
                size="lg"
                positioning={{ sameWidth: true, placement: "bottom" }}
                onSelect={(details) => {
                  setQuery(details.value);
                  onChange(details.value);
                  setOpen(false);
                }}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {filtered.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default ItemField;
