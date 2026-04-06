import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { tvShowA, tvShowB, watchlistA } from "@/test/mocks/data";
import { renderWithProviders } from "@/test/wrapper";
import { WatchlistCatalog } from "./index";

jest.mock("@/services/search", () => ({
  fetchSearchOptions: jest.fn(),
}));

jest.mock("@/services/watchlist", () => ({
  deleteWatchlist: jest.fn(),
}));

const { __getRouterMocks, __resetNavigationMocks } =
  jest.requireActual("next/navigation");
const { fetchSearchOptions } = jest.requireMock("@/services/search");
const { deleteWatchlist } = jest.requireMock("@/services/watchlist");

describe("Watchlist Catalog (behavior)", () => {
  beforeEach(() => {
    __resetNavigationMocks();
    (fetchSearchOptions as jest.Mock).mockImplementation(
      async ({ assetType }: { assetType: string }) => {
        if (assetType === "watchlist") return [watchlistA];
        if (assetType === "tvShows") return [tvShowA, tvShowB];
        return [];
      }
    );
    (deleteWatchlist as jest.Mock).mockResolvedValue({ ok: true });
  });

  it("renders watchlists and navigates to create", async () => {
    const { push } = __getRouterMocks();
    renderWithProviders(<WatchlistCatalog />);

    expect(await screen.findByText(/showing 1 results/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: watchlistA.title })
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /create more/i }));

    expect(push).toHaveBeenCalledWith("/watchlist/new");
  });

  it("deletes a watchlist after confirmation", async () => {
    renderWithProviders(<WatchlistCatalog />);

    expect(await screen.findByText(/showing 1 results/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(
      screen.getByLabelText(
        new RegExp(`open actions for ${watchlistA.title}`, "i")
      )
    );
    await user.click(await screen.findByText(/delete/i));

    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(deleteWatchlist).toHaveBeenCalled();
    expect((deleteWatchlist as jest.Mock).mock.calls[0][0]).toEqual({
      key: watchlistA["@key"],
    });

    expect(await screen.findByText(/watchlist deleted/i)).toBeInTheDocument();
  });
});
