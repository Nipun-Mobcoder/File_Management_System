"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { folderData } from "@/constants/data";
import Folders from "@/components/Folders";
import useTraverseTree from "@/hooks/useTree";
import Editor from "@monaco-editor/react";
import { getEditorLanguage } from "@/utils/getEditorLanguage";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";

type SelectedFile = {
  id: number;
  content: string;
  name: string;
  isFolder: boolean
};

export default function Home() {
  const [explorerData, setExplorerData] = useState(folderData);
  const [language, setLanguage] = useState("plaintext");
  const [output, setOutput] = useState("");

  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const { insertNode, deleteNode, updateNode, updateContent } =
    useTraverseTree();

    const XTerminal = dynamic(
      () => import('@/components/Terminal'),
      { 
        ssr: false,
        loading: () => <div className={styles.terminalPlaceholder}>Loading terminal...</div>
      }
    );
    
    const languageRef = useRef(language);

    useEffect(() => {
      languageRef.current = language;
    }, [language]);
  
    const executeCodeDebounced = useRef(
      debounce((content: string) => {
        console.log("Executing with language:", languageRef.current);
        executeCode(content, languageRef.current);
      }, 1000)
    );
    
    useEffect(() => {
      if (selectedFile?.content && !selectedFile.isFolder) {
        executeCodeDebounced.current(selectedFile.content);
      }
    

      const cancelCodeDebounce = executeCodeDebounced.current;
      return () => {
        cancelCodeDebounce.cancel();
      };
    }, [selectedFile?.content, selectedFile?.isFolder]);
    
    useEffect(() => {
      const cancelCodeDebounce = executeCodeDebounced.current;
      return () => {
        cancelCodeDebounce.cancel();
      };
    }, []);

  const executeCode = async (code: string, lang: string) => {
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        body: JSON.stringify({ code, language: lang }),
      });
      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleInsertNode = (
    folderId: number,
    itemName: string,
    isFolder: boolean
  ) => {
    setExplorerData((prev) => insertNode(prev, folderId, itemName, isFolder));
  };

  const handleDeleteNode = (folderId: number) => {
    setExplorerData((prev) => deleteNode(prev, folderId) || prev);
  };

  const handleUpdateFolder = (id: number, updatedValue: string) => {
    setExplorerData((prev) => updateNode(prev, id, updatedValue));
  };

  const handleFileSelect = (
    fileId: number,
    content: string,
    fileName: string,
    isFolder: boolean
  ) => {
    setSelectedFile({ id: fileId, content, name: fileName, isFolder });
    setLanguage(getEditorLanguage(fileName));
  };

  const handleEditorChange = (value: string | undefined) => {
    if (selectedFile && value !== undefined) {
      setExplorerData((prev) => updateContent(prev, selectedFile.id, value));
      setSelectedFile((prev) => prev && { ...prev, content: value });
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className={styles.main_div}>
        <Folders
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateFolder={handleUpdateFolder}
          explorerData={explorerData}
          handleFileSelect={handleFileSelect}
        />
      </div>
      <main className={styles.main}>
        {selectedFile ? (
          <div className={styles.editorContainer}>
            <Editor
              height="calc(100vh - 300px)"
              language={language}
              value={selectedFile.content}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: "on",
              }}
            />
            <div className={styles.terminalContainer}>
              <XTerminal content={output} />
            </div>
          </div>
        ) : (
          <div className={styles.editor_placeholder}>
            Select a file to start editing
          </div>
        )}
      </main>
    </div>
  );
}
