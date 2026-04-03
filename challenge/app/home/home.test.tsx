import { fireEvent, render, screen } from "@testing-library/react";

import Header from "@/app/components/Header";

const pushMock = jest.fn();
let pathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Home", () => {
  beforeEach(() => {
    pushMock.mockClear();
    pathname = "/";
  });

  it("renders home, tv shows and watchlist tabs", () => {
    render(<Header />);

    expect(screen.getByRole("tab", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /tv shows/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /watchlist/i })).toBeInTheDocument();
  });

  it("navigates between home, tv shows and watchlist", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("tab", { name: /tv shows/i }));
    fireEvent.click(screen.getByRole("tab", { name: /watchlist/i }));
    fireEvent.click(screen.getByRole("tab", { name: /home/i }));

    expect(pushMock).toHaveBeenNthCalledWith(1, "/tv-shows");
    expect(pushMock).toHaveBeenNthCalledWith(2, "/watchlist");
    expect(pushMock).toHaveBeenNthCalledWith(3, "/");
  });

  it("marks the current route tab as selected", () => {
    pathname = "/watchlist";
    render(<Header />);

    expect(screen.getByRole("tab", { name: /watchlist/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
