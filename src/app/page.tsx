"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { folderData } from "@/constants/data";
import Folders from "@/components/Folders";
import useTraverseTree from "@/hooks/useTree";

export default function Home() {
  const [explorerData, setExplorerData] = useState(folderData);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId: number, itemName: string, isFolder: boolean) => {
    setExplorerData((prev) => insertNode(prev, folderId, itemName, isFolder));
  };

  const handleDeleteNode = (folderId: number) => {
    setExplorerData((prev) => deleteNode(prev, folderId) || prev);
  };

  const handleUpdateFolder = (id: number, updatedValue: string) => {
    setExplorerData((prev) => updateNode(prev, id, updatedValue));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className={styles.main_div}>
        <Folders
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateFolder={handleUpdateFolder}
          explorerData={explorerData}
        />
      </div>
      <main className={styles.main}>Your content would be here.</main>
    </div>
  );
}
