import React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "@/components/ui/avatar";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("Avatar Component", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_AVATAR_SERVICE_URL = "https://ui-avatars.com/api";
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it("renders with the correct name", () => {
    const { getByAltText } = render(<Avatar name="Juan Pérez" />);
    expect(getByAltText("Avatar de Juan Pérez")).toBeInTheDocument();
  });

  it("uses the provided image URL when available", () => {
    const { getByAltText } = render(
      <Avatar name="Juan Pérez" imageUrl="https://example.com/avatar.jpg" />
    );
    const avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("falls back to default avatar service when no image URL is provided", () => {
    const { getByAltText } = render(<Avatar name="Juan Pérez" />);
    const avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg.getAttribute("src")).toContain(
      "https://ui-avatars.com/api/?name=Juan%20P%C3%A9rez&background=random"
    );
  });

  it("applies the correct size classes based on size prop", () => {
    const { getByAltText, rerender } = render(
      <Avatar name="Juan Pérez" size="sm" />
    );
    let avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg.className).toContain("w-8 h-8");

    rerender(<Avatar name="Juan Pérez" size="md" />);
    avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg.className).toContain("w-10 h-10");

    rerender(<Avatar name="Juan Pérez" size="lg" />);
    avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg.className).toContain("w-12 h-12");
  });

  it("applies additional classes when provided", () => {
    const { getByAltText } = render(
      <Avatar name="Juan Pérez" className="test-class" />
    );
    const avatarImg = getByAltText("Avatar de Juan Pérez");
    expect(avatarImg.className).toContain("test-class");
  });
});
