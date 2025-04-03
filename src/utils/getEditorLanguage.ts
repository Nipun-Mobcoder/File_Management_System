export const getEditorLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || "";
    switch (extension) {
      case "js":
        return "javascript";
      case "html":
        return "html";
      case "css":
        return "css";
      default:
        return "plaintext";
    }
  };
  