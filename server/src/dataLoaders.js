import DataLoader from "dataloader";

const mapValues = (object, mapper) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, mapper(value)])
  );

export const buildDataLoaders = (loaders) =>
  mapValues(loaders, (loader) => new DataLoader(loader));
