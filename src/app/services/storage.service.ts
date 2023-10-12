import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import TypedLocalStore, {
  MemoryStorage,
  RetrievalMode,
} from 'typed-local-store';

@Injectable({
  providedIn: 'root',
})
export class StorageService<T> {
  readonly retrievealMode: RetrievalMode = 'safe';
  // 'typed-local-store' is a wrapper for localStorage to provide type safe access
  storage: TypedLocalStore<T>;

  constructor() {
    const memoryStorage = new MemoryStorage();
    this.storage = new TypedLocalStore<T>({
      fallbackStorage: memoryStorage,
    });
  }

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.setItem(key, value);
  }

  getItem<K extends keyof T>(key: K): T[K] | null {
    return this.storage.getItem(key, this.retrievealMode);
  }
}
