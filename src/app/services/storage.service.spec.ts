import TypedStorage, { RetrievalMode } from 'typed-local-store';

interface TestStorageSchema {
  exampleValue: string;
  exampleValue1: string;
  exampleValue2: string;
}

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService<TestStorageSchema>;

  beforeEach(() => {
    storageService = new StorageService<TestStorageSchema>();
    storageService.clear(); // Clear local storage before each test
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should set and get an item in local storage', () => {
    const key = 'exampleValue';
    const value = 'testValue';

    storageService.setItem(key, value);
    const retrievedValue = storageService.getItem(key);

    expect(retrievedValue).toBe(value);
  });

  it('should return null when getting an item that does not exist in local storage', () => {
    const key = 'nonExistentKey';
    const retrievedValue = storageService.getItem(
      key as keyof TestStorageSchema
    );

    expect(retrievedValue).toBeNull();
  });

  it('should create an observable for item updates and emit values', (done) => {
    const key = 'exampleValue';
    const updatedValue = 'updatedValue';

    const observable = storageService.getItemObservable(key);

    observable.subscribe((value) => {
      if (value === updatedValue) {
        done();
      }
    });

    storageService.setItem(key, updatedValue);
  });
});
