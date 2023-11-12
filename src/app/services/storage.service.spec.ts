import { StorageService } from './storage.service';
interface TestStorageSchema {
  exampleValue: string;
  exampleValue1: string;
  exampleValue2: string;
  nonExistentKey: string;
}

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
    const retrievedValue = storageService.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should clear all items', () => {
    const key1 = 'exampleValue1';
    const key2 = 'exampleValue2';
    const value1 = 'testValue1';
    const value2 = 'testValue2';

    storageService.setItem(key1, value1);
    storageService.setItem(key2, value2);

    storageService.clear();

    const retrievedValue1 = storageService.getItem(key1);
    const retrievedValue2 = storageService.getItem(key2);

    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });

  it('should create an observable for item updates and emit values', (done) => {
    const key = 'exampleValue';
    const updatedValue = 'updatedValue';

    const observable = storageService.getItemObservable(key);

    observable.subscribe((value) => {
      if (value === updatedValue) {
        expect(value).toBe(updatedValue);
        done();
      }
    });

    storageService.setItem(key, updatedValue);
  });
});
