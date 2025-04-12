import React from "react";

export const Avatar = jest.fn(({ name }) => (
  <div data-testid="avatar">{name}</div>
));
