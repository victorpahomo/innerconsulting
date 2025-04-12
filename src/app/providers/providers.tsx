import { TaskActionsProvider } from "@/context/task-actions-context";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { TasksProvider } from "@/context/tasks-context";
import { UsersProvider } from "@/context/users-context";
import { UIProvider } from "@/context/ui-context";

/**
 * Providers component that wraps the app with the necessary providers
 * @param {React.ReactNode} children - The children components to be wrapped
 * @returns {React.ReactNode} The wrapped components
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <UIProvider>
        <UsersProvider>
          <TasksProvider>
            <TaskActionsProvider>{children}</TaskActionsProvider>
          </TasksProvider>
        </UsersProvider>
      </UIProvider>
    </ErrorBoundary>
  );
}
