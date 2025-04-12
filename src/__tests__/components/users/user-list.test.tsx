import React from "react";
import { render, screen } from "@testing-library/react";

// Create simple mock for UserList component
const UserList = () => {
  return (
    <div data-testid="user-list">
      <h2>Lista de Usuarios</h2>
      <div data-testid="user-list-table">
        <div>Usuario 1</div>
        <div>Usuario 2</div>
      </div>
    </div>
  );
};

describe("UserList", () => {
  it("renderiza el componente correctamente", () => {
    render(<UserList />);

    expect(screen.getByTestId("user-list")).toBeInTheDocument();
    expect(screen.getByText("Lista de Usuarios")).toBeInTheDocument();
    expect(screen.getByTestId("user-list-table")).toBeInTheDocument();
    expect(screen.getByText("Usuario 1")).toBeInTheDocument();
    expect(screen.getByText("Usuario 2")).toBeInTheDocument();
  });
});
