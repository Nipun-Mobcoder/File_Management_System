export type FolderItem = {
    id: number;
    name: string;
    isFolder: boolean;
    items?: FolderItem[];
  };

export const folderData: FolderItem = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "public",
      isFolder: true,
      items: [
        {
          id: 3,
          name: "index.html",
          isFolder: false,
        },
        {
          id: 4,
          name: "hello.html",
          isFolder: false,
        },
      ],
    },
    {
      id: 7,
      name: "src",
      isFolder: true,
      items: [
        {
          id: 8,
          name: "App.js",
          isFolder: false,
        },
        {
          id: 9,
          name: "Index.js",
          isFolder: false,
        },
        {
          id: 10,
          name: "styles.css",
          isFolder: false,
        },
      ],
    },
    {
      id: 11,
      name: "package.json",
      isFolder: false,
      items: [],
    },
  ],
};
