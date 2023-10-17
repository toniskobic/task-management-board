import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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
  private valueUpdateMap: Map<keyof T, Subject<T[keyof T] | null>> = new Map();

  constructor() {
    const memoryStorage = new MemoryStorage();
    this.storage = new TypedLocalStore<T>({
      fallbackStorage: memoryStorage,
    });
  }

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.setItem(key, value);

    // Create an observable if it doesn't exist for this key
    if (!this.valueUpdateMap.has(key)) {
      this.valueUpdateMap.set(key, new Subject<T[keyof T] | null>());
    }

    // Fetch the updated value and emit it through the corresponding observable
    const updatedValue = this.getItem(key);
    this.valueUpdateMap.get(key)?.next(updatedValue);
  }

  getItem<K extends keyof T>(key: K): T[K] | null {
    return this.storage.getItem(key, this.retrievealMode);
  }

  // Create an Observable to listen to value updates for a specific key
  getItemObservable(key: keyof T): Observable<T[keyof T] | null> {
    if (!this.valueUpdateMap.has(key)) {
      this.valueUpdateMap.set(key, new Subject<T[keyof T] | null>());
    }
    // Create an observable that emits the value when subscribed
    return new Observable<T[keyof T] | null>((observer) => {
      // Emit the current value when a subscriber subscribes
      const currentValue = this.getItem(key);
      observer.next(currentValue);

      // Subscribe to the Subject for future updates
      const subject = this.valueUpdateMap.get(key)!;
      const subscription = subject.subscribe((value) => {
        observer.next(value);
      });

      // Cleanup the subscription when the observable is unsubscribed
      return () => {
        subscription;
      };
    });
  }

  clear() {
    this.storage.clear();
    this.valueUpdateMap.forEach((value) => value.next(null));
  }
}
