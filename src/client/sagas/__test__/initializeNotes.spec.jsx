import { put, call } from 'redux-saga/effects';
import initializeNotes from '../initializeNotes';
import { page, notes } from '../../actions';
import { getNotes } from '../../fetches';

describe('initializeNotes saga tests', () => {
  it('loads notes', async () => {
    const mockFetchData = [{ id: 1, value: 'test_value' }];
    const gen = initializeNotes();
    expect(gen.next().value).toEqual(put(page.setLoading(true)));
    expect(gen.next().value).toEqual(call(getNotes));
    expect(gen.next({ data: mockFetchData }).value).toEqual(put(notes.setNotes(mockFetchData)));
    expect(gen.next().value).toEqual(put(page.setLoading(false)));
    expect(gen.next().done).toBeTruthy();
  });
  // TODO add error handling tests once error handling implemented.
});
