import { FolderItem } from "@/constants/data";

const useTraverseTree = () => {
  function insertNode(
    tree: FolderItem,
    folderId: number,
    itemName: string,
    isFolder: boolean
  ): FolderItem {
    if (tree.id === folderId && tree.isFolder) {
      const newItem: FolderItem = {
        id: Date.now(),
        name: itemName,
        isFolder,
        items: isFolder ? [] : undefined,
        content: isFolder ? undefined : "",
      };
      tree.items = [newItem, ...(tree.items || [])];

      return { ...tree };
    }
    return {
      ...tree,
      items:
        tree.items?.map((obj) =>
          insertNode(obj, folderId, itemName, isFolder)
        ) || [],
    };
  }

  function deleteNode(tree: FolderItem, folderId: number): FolderItem | null {
    if (tree.id === folderId) return null;

    return {
      ...tree,
      items:
        tree.items
          ?.map((child) => deleteNode(child, folderId))
          .filter((child): child is FolderItem => Boolean(child)) || [],
    };
  }

  function updateNode(
    tree: FolderItem,
    folderId: number,
    itemName: string
  ): FolderItem {
    if (tree.id === folderId) {
      return { ...tree, name: itemName };
    }

    return {
      ...tree,
      items:
        tree.items?.map((child) => updateNode(child, folderId, itemName)) || [],
    };
  }

  function updateContent(
    tree: FolderItem,
    fileId: number,
    newContent: string
  ): FolderItem {
    if (tree.id === fileId && !tree.isFolder) {
      return { ...tree, content: newContent };
    }

    return {
      ...tree,
      items:
        tree.items?.map((child) => updateContent(child, fileId, newContent)) ||
        [],
    };
  }

  return { insertNode, deleteNode, updateNode, updateContent };
};

export default useTraverseTree;
