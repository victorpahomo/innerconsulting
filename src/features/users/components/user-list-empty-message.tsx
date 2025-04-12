interface UserListEmptyMessageProps {
  message: string;
}

export function UserListEmptyMessage({ message }: UserListEmptyMessageProps) {
  return (
    <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg mb-6">
      <p className="text-gray-500 text-center px-4">{message}</p>
    </div>
  );
}
