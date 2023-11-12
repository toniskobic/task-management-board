import { EditTaskDialogComponent } from './edit-task-dialog.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task, TaskPriority, TaskStatus } from 'src/app/models/task.model';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import moment from 'moment';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

describe('EditTaskDialogComponent', () => {
  let component: EditTaskDialogComponent;
  let fixture: ComponentFixture<EditTaskDialogComponent>;
  let storageService: StorageService<StorageSchema>;

  const mockData: { isEdit: boolean } = {
    isEdit: false, // Set to true if you want to test the edit functionality
  };

  const mockDialogRef = {
    close: (dialogResult: any) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        EditTaskDialogComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        UtilsService,
        StorageService,
        {
          provide: DialogRef<EditTaskDialogComponent>,
          useValue: mockDialogRef,
        },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskDialogComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the task', () => {
    spyOn(storageService, 'getItem').and.returnValue([]); // Mock getItem method
    spyOn(storageService, 'setItem'); // Mock setItem method
    spyOn(mockDialogRef, 'close'); // Mock dialog close method

    const createdAt = moment();
    const dueDate = moment().add(1, 'days');

    const mockTask: Task = {
      title: 'Test Task',
      status: TaskStatus.InProgress,
      priority: TaskPriority.Medium,
      assignee: 'John Doe',
      description: 'Test description',
      dueDate: dueDate.format(),
    } as Task; // Create a mock task for testing

    component.form.setValue({
      title: 'Test Task',
      status: TaskStatus.InProgress,
      priority: TaskPriority.Medium,
      assignee: 'John Doe',
      description: 'Test description',
      createdAt: createdAt,
      dueDate: dueDate,
    });

    component.save();

    if (component.data.isEdit) {
      expect(storageService.setItem).toHaveBeenCalledWith(
        'tasks',
        jasmine.arrayContaining([jasmine.objectContaining(mockTask)])
      );
    } else {
      expect(storageService.setItem).toHaveBeenCalledWith(
        'tasks',
        jasmine.arrayContaining([
          jasmine.objectContaining(mockTask),
          jasmine.any(Object),
        ])
      );
    }

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
