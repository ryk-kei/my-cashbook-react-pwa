import { Button, DownloadTrigger, Text } from "@chakra-ui/react";
import { LiaFileExportSolid } from "react-icons/lia";
import { exportJson, generateFileName } from "../../db/export-import";
import styles from "./IO.module.css";

const ExportJsonButton = () => {
  return (
    <>
      <DownloadTrigger
        data={() => exportJson()}
        fileName={`${generateFileName("json")}`}
        mimeType="application/json;charset=utf-8"
        asChild
      >
        <Button aria-label="Export" className={styles.button}>
          <LiaFileExportSolid />
          <Text>Export Json</Text>
        </Button>
      </DownloadTrigger>
    </>
  );
};

export default ExportJsonButton;
