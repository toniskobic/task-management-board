import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DragDropzoneDirective } from './drag-dropzone.directive';
import { Component, ViewChild } from '@angular/core';
import { Target } from '@angular/compiler';

@Component({
  standalone: true,
  imports: [DragDropzoneDirective],
  template: ` <div tmbDragDropzone [dropCallback]="dropCallback"></div> `,
})
class TestHostComponent {
  @ViewChild(DragDropzoneDirective)
  dragDropzoneDirective!: DragDropzoneDirective;

  dropCallback(event: DragEvent): void | Promise<void> {}
}

describe('DragDropzoneDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragDropzoneDirective, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should call dropCallback on drop', () => {
    const divElement = fixture.debugElement.nativeElement.querySelector('div');
    const dragEvent = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });

    spyOn<DragDropzoneDirective, any>(
      testHost.dragDropzoneDirective,
      'dropCallback'
    );
    divElement.dispatchEvent(dragEvent);

    expect(testHost.dragDropzoneDirective.dropCallback).toHaveBeenCalled();
  });

  it('should call onDragOver method', () => {
    const divElement = fixture.debugElement.nativeElement.querySelector('div');
    const dragEvent = new DragEvent('dragover');
    dragEvent.preventDefault = jasmine.createSpy('preventDefault');

    spyOn(testHost.dragDropzoneDirective, 'onDragOver').and.callThrough();
    divElement.dispatchEvent(dragEvent);

    expect(testHost.dragDropzoneDirective.onDragOver).toHaveBeenCalled();
    expect(dragEvent.preventDefault).toHaveBeenCalled();
  });

  it('should call onDragEnter method', () => {
    const divElement = fixture.debugElement.nativeElement.querySelector('div');
    const dragEvent = new DragEvent('dragenter');

    spyOn(testHost.dragDropzoneDirective, 'onDragEnter').and.callThrough();
    divElement.dispatchEvent(dragEvent);

    expect(testHost.dragDropzoneDirective.onDragEnter).toHaveBeenCalled();
    expect(divElement.classList.contains('active-dropzone')).toBe(true);
  });

  it('should call onDragLeave method', () => {
    const divElement = fixture.debugElement.nativeElement.querySelector('div');
    const dragEvent = createDragEvent('dragleave', divElement as Target);

    spyOn(testHost.dragDropzoneDirective, 'onDragLeave');
    divElement.dispatchEvent(dragEvent);

    expect(testHost.dragDropzoneDirective.onDragLeave).toHaveBeenCalled();
    expect(divElement.classList.contains('active-dropzone')).toBe(false);
  });
});

function createDragEvent(eventName: string, target: Target) {
  const event: CustomEvent & { dataTransfer?: any } = new CustomEvent(
    eventName,
    { bubbles: true, cancelable: true }
  );

  const dataTransferData: any = [];
  event.dataTransfer = {
    dataTransferData: dataTransferData,
    effectAllowed: 'uninitialized',
    dropEffect: 'none',
    target: target,
  };
  return event;
}
