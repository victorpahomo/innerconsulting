export const useDeleteUser = jest.fn(() => ({
  executeDeleteUser: jest.fn((id, { onSuccess, onFinally }) => {
    onSuccess();
    onFinally();
    return Promise.resolve();
  }),
}));
