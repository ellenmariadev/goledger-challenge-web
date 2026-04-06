import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { tvShowA, tvShowB, watchlistA } from "@/test/mocks/data";
import { renderWithProviders } from "@/test/wrapper";
import { EditWatchlistForm } from "./EditWatchlistForm";
import { NewWatchlistForm } from "./NewWatchlistForm";

jest.mock("@/services/search", () => ({
  fetchSearchOptions: jest.fn(),
}));

jest.mock("@/services/watchlist", () => ({
  createWatchlist: jest.fn(),
  updateWatchlist: jest.fn(),
  readWatchlist: jest.fn(),
}));

jest.mock("@/services/read", () => ({
  readAsset: jest.fn(),
}));

const { __getRouterMocks, __resetNavigationMocks, __setSearchParams } =
  jest.requireActual("next/navigation");
const { fetchSearchOptions } = jest.requireMock("@/services/search");
const { createWatchlist, updateWatchlist, readWatchlist } = jest.requireMock(
  "@/services/watchlist"
);
const { readAsset } = jest.requireMock("@/services/read");

describe("Watchlist CRUD (behavior)", () => {
  beforeEach(() => {
    __resetNavigationMocks();
    __setSearchParams({ preselect: null });

    (fetchSearchOptions as jest.Mock).mockImplementation(
      async ({ assetType }: { assetType: string }) => {
        if (assetType === "tvShows") return [tvShowA, tvShowB];
        if (assetType === "watchlist") return [watchlistA];
        return [];
      }
    );

    (createWatchlist as jest.Mock).mockResolvedValue({ ok: true });
    (updateWatchlist as jest.Mock).mockResolvedValue({ ok: true });

    (readWatchlist as jest.Mock).mockResolvedValue({
      ...watchlistA,
      tvShows: watchlistA.tvShows,
    });

    (readAsset as jest.Mock).mockImplementation(
      async (_assetType: string, key: string) => {
        if (key === tvShowA["@key"]) return tvShowA;
        if (key === tvShowB["@key"]) return tvShowB;
        return null;
      }
    );
  });

  it("creates a watchlist and selects a tv show via search", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(<NewWatchlistForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/^title$/i), "  Weekend picks  ");
    await user.type(screen.getByLabelText(/^description$/i), "  some desc  ");

    const searchInput = screen.getByLabelText(/search tv shows/i);
    await user.click(searchInput);
    await user.type(searchInput, "break");

    await user.click(await screen.findByText(tvShowA.title));

    await user.click(screen.getByRole("button", { name: /save watchlist/i }));

    expect(createWatchlist).toHaveBeenCalledWith({
      title: "Weekend picks",
      description: "some desc",
      tvShowKeys: [tvShowA["@key"]],
    });

    expect(await screen.findByText(/watchlist created/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });

  it("edits an existing watchlist", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(
      <EditWatchlistForm watchlistSlug={watchlistA["@key"]} />
    );

    expect(
      await screen.findByDisplayValue(watchlistA.title)
    ).toBeInTheDocument();

    const user = userEvent.setup();
    const titleInput = screen.getByLabelText(/^title$/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated list");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(updateWatchlist).toHaveBeenCalledWith({
      key: watchlistA["@key"],
      title: "Updated list",
      description: watchlistA.description,
      tvShowKeys: [tvShowA["@key"]],
    });

    expect(await screen.findByText(/watchlist updated/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });
});
