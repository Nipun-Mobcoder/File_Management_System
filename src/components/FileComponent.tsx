import { useState } from "react";
import { FolderItem } from "@/constants/data";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";
import styles from "./components.module.css";

const FileComponent = ({
  folderData,
  open,
  setOpen,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder
}: {
  folderData: FolderItem;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInsertNode: (folderId: number, name: string, isFolder: boolean) => void;
  handleDeleteNode: (folderId: number) => void;
  handleUpdateFolder: (folderId: number, name: string) => void;
}) => {
  const [newItemName, setNewItemName] = useState("");
  const [isAdding, setIsAdding] = useState<null | "file" | "folder">(null);

  const handleAddNew = (isFolder: boolean) => {
    setIsAdding(isFolder ? "folder" : "file");
    setNewItemName("");
  };

  const handleInputBlur = () => {
    if (newItemName.trim()) {
      handleInsertNode(folderData.id, newItemName, isAdding === "folder");
    }
    setIsAdding(null);
  };

  return (
    <div>
      <div className={styles.file_main} onClick={() => setOpen((prev) => !prev)}>
        <div className={styles.file_sub}>
          {folderData.items && folderData.items.length > 0 ? (
            open ? <VscChevronDown className={styles.normal_icon} /> : <VscChevronRight className={styles.normal_icon} />
          ) : null}

          {folderData.isFolder ? <VscFolder className={styles.normal_icon} /> : <VscFile className={styles.normal_icon} />}
          <p>{folderData.name}</p>
        </div>

        <div className={styles.action_icons} onClick={(e) => e.stopPropagation()}>
          {folderData.isFolder && (
            <>
              <VscNewFolder className={styles.icons} onClick={() => handleAddNew(true)} />
              <VscNewFile className={styles.icons} onClick={() => handleAddNew(false)} />
            </>
          )}
          <VscEdit className={styles.icons} onClick={() => handleUpdateFolder(folderData.id, prompt("Rename to?", folderData.name) || folderData.name)} />
          <VscTrash className={styles.icons} onClick={() => handleDeleteNode(folderData.id)} />
        </div>
      </div>

      {isAdding && (
        <div className={styles.new_item}>
          {isAdding === "folder" ? <VscFolder className={styles.normal_icon} /> : <VscFile className={styles.normal_icon} />}
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            autoFocus
            onBlur={handleInputBlur}
            onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
            className={styles.input}
          />
        </div>
      )}
    </div>
  );
};

export default FileComponent;
