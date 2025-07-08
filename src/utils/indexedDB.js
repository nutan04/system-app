import { openDB } from 'idb';

export const initDB = async () => {
  return await openDB('FormSyncDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('formData')) {
        db.createObjectStore('formData', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveOffline = async (data) => {
  const db = await initDB();
  await db.add('formData', data);
};

export const getAllOfflineData = async () => {
  const db = await initDB();
  return await db.getAll('formData');
};

export const clearOfflineData = async () => {
  const db = await initDB();
  await db.clear('formData');
};
