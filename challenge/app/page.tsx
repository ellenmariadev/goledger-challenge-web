import type { Metadata } from "next";

import Home from "./(pages)/home/page";

export const metadata: Metadata = {
  title: "Home",
  description: "Manage TV shows, seasons, episodes, and watchlists.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoLedger Challenge",
    description: "Manage TV shows, seasons, episodes, and watchlists.",
    url: "/",
  },
};

export default Home;
