import React from "react";

export const ConfirmationModal = jest.fn(({ onConfirm }) => (
  <div data-testid="confirmation-modal">
    <button data-testid="confirm-button" onClick={onConfirm}>
      Confirmar
    </button>
  </div>
));
