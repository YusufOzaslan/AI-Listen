import { BlobServiceClient } from "@azure/storage-blob";
import { appConfig } from "../../configs";
import fs from 'fs';

const uploadFile = async (filePath: string): Promise<string> => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    appConfig.azureStorage.connectionString
  );
  const containerClient = blobServiceClient.getContainerClient(
    appConfig.azureStorage.containerName
  );
  const blockBlobClient = containerClient.getBlockBlobClient(filePath);
  await blockBlobClient.uploadFile(filePath);
  fs.promises.unlink(filePath);
  return blockBlobClient.url;
};

export const azureStorageService = {
    uploadFile,
  };
  