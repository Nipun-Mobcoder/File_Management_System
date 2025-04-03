import { FolderItem } from "@/constants/data";
import { useState } from "react";
import FileComponent from "./FileComponent";
import styles from "./components.module.css";

const Folders = ({
  explorerData,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  handleFileSelect,
}: {
  explorerData: FolderItem;
  handleInsertNode: (folderId: number, name: string, isFolder: boolean) => void;
  handleDeleteNode: (folderId: number) => void;
  handleUpdateFolder: (folderId: number, name: string) => void;
  handleFileSelect?: (id: number, content: string, fileName: string, isFolder: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  

  return (
    <div className={styles.folder}>
      <FileComponent
        folderData={explorerData}
        open={open}
        setOpen={setOpen}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateFolder={handleUpdateFolder}
        handleFileSelect={handleFileSelect}
      />
      {open && (
        <div className={styles.folder_children}>
          {explorerData.items?.map((item) => (
            <Folders
              key={item.id}
              explorerData={item}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateFolder={handleUpdateFolder}
              handleFileSelect={handleFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folders;
