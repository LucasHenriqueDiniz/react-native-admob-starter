import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Loads a string from storage.
 * @param key The key to fetch.
 * @returns The string value or null if not found.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Saves a string to storage.
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 * @param key The key to fetch.
 * @returns The parsed object or null if not found.
 */
export async function load<T = unknown>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key)
    if (!item) return null
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Clears all storage.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}

/**
 * Gets all keys from storage.
 * @returns Array of keys or empty array if error
 */
export async function getAllKeys(): Promise<readonly string[]> {
  try {
    return await AsyncStorage.getAllKeys()
  } catch {
    return []
  }
}

// Export AsyncStorage directly for any other storage needs
export { AsyncStorage as storage }
