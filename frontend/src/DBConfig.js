export const DBConfig = {
  name: "DucktalkDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "keys",
      storeConfig: { keyPath: "name" },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "key", keypath: "key", options: { unique: false } },
      ],
    },
  ],
};
