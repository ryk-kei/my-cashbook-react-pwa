import { Button, FileUpload, Text } from "@chakra-ui/react";
import { LiaFileImportSolid } from "react-icons/lia";
import { importKozukai } from "../../db/import-kozukai";
import styles from "./IO.module.css";

const ImportKozukaiButton = () => {
  return (
    <>
      <FileUpload.Root
        onFileAccept={(details) => {
          importKozukai(details.files);
        }}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button aria-label="Import" className={styles.button}>
            <LiaFileImportSolid />
            <Text>Import CSV こづかい帳（iPhone App）</Text>
          </Button>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>
    </>
  );
};

export default ImportKozukaiButton;
