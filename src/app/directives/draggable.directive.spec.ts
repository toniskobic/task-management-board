import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DraggableDirective } from './draggable.directive';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

const mockData = 'testData';

@Component({
  standalone: true,
  imports: [DraggableDirective],
  template: ` <div tmbDraggable [dragData]="dragData"></div> `,
})
class TestHostComponent {
  dragData = mockData;
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DraggableDirective, TestHostComponent],
      declarations: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should set draggable attribute and data transfer on drag start', () => {
    const divElement: HTMLDivElement =
      fixture.debugElement.nativeElement.querySelector('div');

    const event = createDragEvent('dragstart');
    divElement.dispatchEvent(event);

    expect(divElement.getAttribute('draggable')).toBe('true');
    expect((event.dataTransfer as DataTransfer).setData).toHaveBeenCalledWith(
      'text/plain',
      mockData
    );
    expect((event.dataTransfer as DataTransfer).effectAllowed).toBe('move');
  });
});

function createDragEvent(eventName: string) {
  const event: CustomEvent & { dataTransfer?: any } = new CustomEvent(
    eventName,
    { bubbles: true, cancelable: true }
  );

  const dataTransferData: any = [];
  event.dataTransfer = {
    dataTransferData: dataTransferData,
    effectAllowed: 'uninitialized',
    dropEffect: 'none',
    setData: jasmine
      .createSpy('setData() spy')
      .and.callFake(function (type: string, value: any) {
        dataTransferData[0] = type;
        dataTransferData[1] = value;
      }),
    getData: jasmine.createSpy('getData() spy').and.callFake(function () {
      return dataTransferData[0] === 'text/plain'
        ? dataTransferData[1]
        : undefined;
    }),
  };
  return event;
}
