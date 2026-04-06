import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NewTvShowForm } from "./Forms/NewTvShowForm";
import { EditTvShowForm } from "./Forms/EditTvShowForm";
import { renderWithProviders } from "@/test/wrapper";
import { tvShowA, tvShowB } from "@/test/mocks/data";

jest.mock("@/services/tvShow", () => ({
  createTvShow: jest.fn(),
  updateTvShow: jest.fn(),
}));

jest.mock("@/services/search", () => ({
  fetchSearchOptions: jest.fn(),
}));

jest.mock("@/services/read", () => ({
  readAsset: jest.fn(),
}));

const { __getRouterMocks, __resetNavigationMocks } =
  jest.requireActual("next/navigation");
const { createTvShow, updateTvShow } = jest.requireMock("@/services/tvShow");
const { fetchSearchOptions } = jest.requireMock("@/services/search");
const { readAsset } = jest.requireMock("@/services/read");

describe("TV Show CRUD (behavior)", () => {
  beforeEach(() => {
    __resetNavigationMocks();
    (createTvShow as jest.Mock).mockResolvedValue({ ok: true });
    (updateTvShow as jest.Mock).mockResolvedValue({ ok: true });
    (fetchSearchOptions as jest.Mock).mockImplementation(
      async ({ assetType }: { assetType: string }) => {
        if (assetType === "tvShows") return [tvShowA, tvShowB];
        return [];
      }
    );
    (readAsset as jest.Mock).mockImplementation(
      async (_assetType: string, key: string) => {
        if (key === tvShowA["@key"]) return tvShowA;
        if (key === tvShowB["@key"]) return tvShowB;
        return null;
      }
    );
  });

  it("creates a tv show and navigates back", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(<NewTvShowForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/^title$/i), "  New Title  ");
    await user.type(screen.getByLabelText(/^description$/i), "  Desc  ");

    const ageInput = screen.getByLabelText(/recommended age/i);
    await user.clear(ageInput);
    await user.type(ageInput, "18");

    await user.click(screen.getByRole("button", { name: /save tv show/i }));

    expect(createTvShow).toHaveBeenCalledWith({
      title: "New Title",
      description: "Desc",
      recommendedAge: 18,
    });

    expect(await screen.findByText(/tv show created/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });

  it("edits a tv show and calls update", async () => {
    const { back } = __getRouterMocks();

    renderWithProviders(<EditTvShowForm tvShowKey={tvShowA["@key"]} />);

    expect(await screen.findByDisplayValue(tvShowA.title)).toBeInTheDocument();

    const user = userEvent.setup();

    const titleInput = screen.getByLabelText(/^title$/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(updateTvShow).toHaveBeenCalledWith({
      key: tvShowA["@key"],
      title: "Updated",
      description: tvShowA.description,
      recommendedAge: tvShowA.recommendedAge,
    });

    expect(await screen.findByText(/tv show updated/i)).toBeInTheDocument();
    expect(back).toHaveBeenCalled();
  });
});
