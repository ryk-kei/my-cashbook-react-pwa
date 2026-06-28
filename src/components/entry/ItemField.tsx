import { Button, Input, InputGroup } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";

type Props = {
  item: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

const ItemField = (props: Props) => {
  const { item, onChange, readOnly } = props;

  return (
    <>
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
          onChange={(e) => onChange(e.target.value)}
          disabled={readOnly}
        />
      </InputGroup>
    </>
  );
};

export default ItemField;
