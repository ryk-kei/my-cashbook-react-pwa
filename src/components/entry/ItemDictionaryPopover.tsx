import { Button, List, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  dictionary: string[];
  onSelect: (value: string) => void;
};

const ItemDictionaryPopover = ({ dictionary, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root
      open={open}
      onOpenChange={(details) => {
        setOpen(details.open);
      }}
    >
      <Button size="sm" onClick={() => setOpen(true)}>
        項目辞書
      </Button>

      <Portal>
        <Popover.Content w="200px">
          <Popover.Body>
            <List.Root>
              {dictionary.map((d) => (
                <List.Item key={d}>
                  <Button
                    variant="ghost"
                    w="100%"
                    justifyContent="flex-start"
                    onClick={() => {
                      onSelect(d);
                      setOpen(false);
                    }}
                  >
                    {d}
                  </Button>
                </List.Item>
              ))}
            </List.Root>
          </Popover.Body>
        </Popover.Content>
      </Portal>
    </Popover.Root>
  );
};

export default ItemDictionaryPopover;
