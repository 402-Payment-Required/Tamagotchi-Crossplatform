import { AxiosError } from 'axios';

import { getErrorMessage } from './errorHandler';

describe('getErrorMessage', () => {
  it('extracts the server message from an Axios error', () => {
    const error = new AxiosError('Request failed');
    error.response = { data: { message: '잘못된 요청입니다.' } } as AxiosError['response'];
    expect(getErrorMessage(error)).toBe('잘못된 요청입니다.');
  });

  it('falls back to the Axios error message when there is no response body', () => {
    expect(getErrorMessage(new AxiosError('Network Error'))).toBe('Network Error');
  });

  it('returns a plain Error message', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('returns a default message for unknown values', () => {
    expect(getErrorMessage('not an error')).toBe('알 수 없는 오류가 발생했습니다.');
  });
});
