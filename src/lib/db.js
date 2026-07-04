import { openDB } from 'idb';

const DB_NAME = 'cissp-quest-db';
const DB_VERSION = 1;
const STORE_NAME = 'gameState';
const STATE_KEY = 'current';

let dbPromise;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

export async function loadStateFromDB() {
  try {
    const db = await getDB();
    const state = await db.get(STORE_NAME, STATE_KEY);
    if (state) return state;

    // Migrate from localStorage if exists
    const lsData = localStorage.getItem('cissp-quest-state');
    if (lsData) {
      const parsed = JSON.parse(lsData);
      await db.put(STORE_NAME, parsed, STATE_KEY);
      localStorage.removeItem('cissp-quest-state');
      return parsed;
    }
  } catch {
    // Fallback to localStorage
    try {
      const lsData = localStorage.getItem('cissp-quest-state');
      if (lsData) return JSON.parse(lsData);
    } catch {}
  }
  return null;
}

export async function saveStateToDB(state) {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, state, STATE_KEY);
  } catch {
    // Fallback to localStorage
    try {
      localStorage.setItem('cissp-quest-state', JSON.stringify(state));
    } catch {}
  }
}

export async function clearStateFromDB() {
  try {
    const db = await getDB();
    await db.delete(STORE_NAME, STATE_KEY);
  } catch {}
  try {
    localStorage.removeItem('cissp-quest-state');
  } catch {}
}
