import { Button, FileUpload, Text } from "@chakra-ui/react";
import { LiaFileImportSolid } from "react-icons/lia";
import { importFile } from "../../db/export-import";
import styles from "./IO.module.css";

const ImportButton = () => {
  return (
    <>
      <FileUpload.Root
        onFileAccept={(details) => {
          importFile(details.files);
        }}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button aria-label="Import" className={styles.button}>
            <LiaFileImportSolid />
            <Text>Import File (CSV, JSON)</Text>
          </Button>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>
    </>
  );
};

export default ImportButton;
