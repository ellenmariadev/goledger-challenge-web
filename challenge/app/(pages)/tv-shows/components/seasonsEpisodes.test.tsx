import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NewSeasonForm } from "./Forms/NewSeasonForm";
import { NewEpisodeForm } from "./Forms/NewEpisodeForm";
import { SeasonList } from "./SeasonList";
import { EpisodeList } from "./EpisodeList";
import { renderWithProviders } from "@/test/wrapper";
import { episodeA, seasonA, tvShowA } from "@/test/mocks/data";

jest.mock("@/services/search", () => ({
  fetchSearchOptions: jest.fn(),
}));

jest.mock("@/services/read", () => ({
  readAsset: jest.fn(),
}));

jest.mock("@/services/season", () => ({
  createSeason: jest.fn(),
  deleteSeason: jest.fn(),
}));

jest.mock("@/services/episode", () => ({
  createEpisode: jest.fn(),
  deleteEpisode: jest.fn(),
}));

const { __getRouterMocks, __resetNavigationMocks, __setSearchParams } =
  jest.requireActual("next/navigation");
const { fetchSearchOptions } = jest.requireMock("@/services/search");
const { readAsset } = jest.requireMock("@/services/read");
const { createSeason, deleteSeason } = jest.requireMock("@/services/season");
const { createEpisode, deleteEpisode } = jest.requireMock("@/services/episode");

describe("Seasons & Episodes CRUD (behavior)", () => {
  beforeEach(() => {
    __resetNavigationMocks();
    __setSearchParams({ tvShowKey: tvShowA["@key"] });

    (fetchSearchOptions as jest.Mock).mockImplementation(
      async ({ assetType }: { assetType: string }) => {
        if (assetType === "seasons") return [seasonA];
        if (assetType === "episodes") return [episodeA];
        return [];
      }
    );

    (readAsset as jest.Mock).mockResolvedValue(tvShowA);

    (createSeason as jest.Mock).mockResolvedValue({ ok: true });
    (deleteSeason as jest.Mock).mockResolvedValue({ ok: true });
    (createEpisode as jest.Mock).mockResolvedValue({ ok: true });
    (deleteEpisode as jest.Mock).mockResolvedValue({ ok: true });
  });

  it("creates a season for a tv show", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(<NewSeasonForm />);

    expect(await screen.findByText(tvShowA.title)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.clear(screen.getByLabelText(/^number$/i));
    await user.type(screen.getByLabelText(/^number$/i), "2");
    await user.clear(screen.getByLabelText(/year of release/i));
    await user.type(screen.getByLabelText(/year of release/i), "2021");

    await user.click(screen.getByRole("button", { name: /^save$/i }));

    expect(createSeason).toHaveBeenCalledWith({
      tvShowKey: tvShowA["@key"],
      number: 2,
      year: 2021,
    });

    expect(await screen.findByText(/season created/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });

  it("creates an episode for a tv show", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(<NewEpisodeForm />);

    expect(await screen.findByText(tvShowA.title)).toBeInTheDocument();

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/^release date$/i), "2020-02-02");
    await user.type(screen.getByLabelText(/^title$/i), "New Ep");
    await user.type(screen.getByLabelText(/^description$/i), "Desc");

    const ratingInput = screen.getByLabelText(/rating/i);
    await user.clear(ratingInput);
    await user.type(ratingInput, "5");

    await user.click(screen.getByRole("button", { name: /^save$/i }));

    expect(createEpisode).toHaveBeenCalledWith({
      seasonKey: seasonA["@key"],
      episodeNumber: 2,
      title: "New Ep",
      releaseDate: "2020-02-02T00:00:00.000Z",
      description: "Desc",
      rating: 5,
    });

    expect(await screen.findByText(/episode created/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });

  it("deletes a season from the list after confirmation", async () => {
    renderWithProviders(<SeasonList tvShowKey={tvShowA["@key"]} />);

    expect(await screen.findByText(/season 1/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByLabelText(/open actions for season 1/i));
    await user.click(await screen.findByText(/delete/i));
    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(deleteSeason).toHaveBeenCalled();
    expect((deleteSeason as jest.Mock).mock.calls[0][0]).toEqual({
      key: seasonA["@key"],
    });
    expect(await screen.findByText(/season deleted/i)).toBeInTheDocument();
  });

  it("deletes an episode from the list after confirmation", async () => {
    renderWithProviders(<EpisodeList tvShowKey={tvShowA["@key"]} />);

    expect(await screen.findByText(/pilot/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByLabelText(/open actions for pilot/i));
    await user.click(await screen.findByText(/delete/i));
    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(deleteEpisode).toHaveBeenCalled();
    expect((deleteEpisode as jest.Mock).mock.calls[0][0]).toEqual({
      key: episodeA["@key"],
    });
    expect(await screen.findByText(/episode deleted/i)).toBeInTheDocument();
  });
});
