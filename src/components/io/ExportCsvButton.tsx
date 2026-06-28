import { Button, DownloadTrigger, Text } from "@chakra-ui/react";
import { LiaFileExportSolid } from "react-icons/lia";
import { exportCsv, generateFileName } from "../../db/export-import";
import styles from "./IO.module.css";

const ExportCsvButton = () => {
  return (
    <>
      <DownloadTrigger
        data={() => exportCsv()}
        fileName={`${generateFileName("csv")}`}
        mimeType="text/csv;charset=utf-8"
        asChild
      >
        <Button aria-label="Export" className={styles.button}>
          <LiaFileExportSolid />
          <Text>Export CSV</Text>
        </Button>
      </DownloadTrigger>
    </>
  );
};

export default ExportCsvButton;
