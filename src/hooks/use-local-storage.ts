import { useState, useEffect, useCallback } from 'react';

/**
 * Drop-in replacement for Spark's useKV hook.
 * Persists state to localStorage so data survives page reloads.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (valueOrUpdater: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.warn(`Failed to persist "${key}" to localStorage`, err);
    }
  }, [key, storedValue]);

  const setValue = useCallback(
    (valueOrUpdater: T | ((prev: T) => T)) => {
      setStoredValue((prev) =>
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: T) => T)(prev)
          : valueOrUpdater,
      );
    },
    [],
  );

  return [storedValue, setValue];
}
