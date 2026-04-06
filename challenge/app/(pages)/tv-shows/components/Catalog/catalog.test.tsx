import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  episodeA,
  seasonA,
  tvShowA,
  tvShowB,
  watchlistA,
} from "@/test/mocks/data";
import { renderWithProviders } from "@/test/wrapper";
import Catalog from "./index";

jest.mock("@/services/search", () => ({
  fetchSearchOptions: jest.fn(),
}));

jest.mock("@/services/tvShow", () => ({
  deleteTvShow: jest.fn(),
}));

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getTotalSize: () => count * 280,
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        key: String(index),
        index,
        start: index * 280,
      })),
    measureElement: () => {},
  }),
}));

const { __getRouterMocks, __resetNavigationMocks } =
  jest.requireActual("next/navigation");
const { fetchSearchOptions } = jest.requireMock("@/services/search");
const { deleteTvShow } = jest.requireMock("@/services/tvShow");

describe("TV Shows Catalog (behavior)", () => {
  beforeEach(() => {
    __resetNavigationMocks();
    (fetchSearchOptions as jest.Mock).mockImplementation(
      async ({ assetType }: { assetType: string }) => {
        if (assetType === "tvShows") return [tvShowA, tvShowB];
        if (assetType === "watchlist") return [watchlistA];
        if (assetType === "seasons") return [seasonA];
        if (assetType === "episodes") return [episodeA];
        return [];
      }
    );
    (deleteTvShow as jest.Mock).mockResolvedValue({ ok: true });
  });

  it("renders tv shows and filters via search input", async () => {
    renderWithProviders(<Catalog />);

    expect(await screen.findByText(/2 results/i)).toBeInTheDocument();

    expect(screen.getByLabelText(tvShowA.title)).toBeInTheDocument();
    expect(screen.getByLabelText(tvShowB.title)).toBeInTheDocument();

    const user = userEvent.setup();
    const input = screen.getByLabelText(/search tv shows/i);

    await user.type(input, "breaking");

    expect(await screen.findByText(/1 results/i)).toBeInTheDocument();
    expect(screen.getByLabelText(tvShowA.title)).toBeInTheDocument();
    expect(screen.queryByLabelText(tvShowB.title)).not.toBeInTheDocument();
  });

  it("navigates to new tv show page", async () => {
    const { push } = __getRouterMocks();
    renderWithProviders(<Catalog />);

    expect(await screen.findByText(/2 results/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /\+ new tv show/i }));

    expect(push).toHaveBeenCalledWith("/tv-shows/new");
  });

  it("deletes a tv show from the catalog after confirmation", async () => {
    renderWithProviders(<Catalog />);

    expect(await screen.findByText(/2 results/i)).toBeInTheDocument();

    const user = userEvent.setup();

    const card = screen.getByLabelText(tvShowA.title);
    const menuTrigger = within(card).getByLabelText(
      new RegExp(`open actions for ${tvShowA.title}`, "i")
    );

    await user.click(menuTrigger);
    await user.click(await screen.findByText(/delete/i));

    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(deleteTvShow).toHaveBeenCalled();
    expect((deleteTvShow as jest.Mock).mock.calls[0][0]).toEqual({
      key: tvShowA["@key"],
    });

    expect(await screen.findByText(/tv show deleted/i)).toBeInTheDocument();
  });
});
