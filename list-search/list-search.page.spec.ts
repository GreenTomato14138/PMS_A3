import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSearchPage } from './list-search.page';

describe('ListSearchPage', () => {
  let component: ListSearchPage;
  let fixture: ComponentFixture<ListSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
