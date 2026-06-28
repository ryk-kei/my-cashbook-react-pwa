import { CloseButton, Dialog, Flex } from "@chakra-ui/react";
import ExportCsvButton from "./ExportCsvButton";
import ImportKozukaiButton from "./ImportKozukaiButton";
import ExportJsonButton from "./ExportJsonButton";
import ImportButton from "./ImportButton";

export const IODialog = () => {
  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>

          <Dialog.Header>
            <Dialog.Title>IOフォーム</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Flex gap="4" direction="column">
              <Dialog.Title fontSize={"sm"}>Export</Dialog.Title>
              <ExportCsvButton />
              <ExportJsonButton />
              <Dialog.Title fontSize={"sm"}>Import</Dialog.Title>
              <ImportButton />
              <ImportKozukaiButton />
            </Flex>
          </Dialog.Body>

          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </>
  );
};
