import type { Metadata } from "next";

import WatchlistPage from "./(pages)/list/page";

export const metadata: Metadata = {
  title: "Watchlists",
  description: "Create and manage watchlists for your TV shows.",
  alternates: {
    canonical: "/watchlist",
  },
  openGraph: {
    title: "Watchlists",
    description: "Create and manage watchlists for your TV shows.",
    url: "/watchlist",
  },
};

export default WatchlistPage;
