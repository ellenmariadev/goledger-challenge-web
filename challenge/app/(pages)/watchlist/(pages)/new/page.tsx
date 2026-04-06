import { NewWatchlistForm } from "@/app/(pages)/watchlist/components/NewWatchlistForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Watchlist",
  description: "Create a new watchlist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewWatchlistPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewWatchlistForm />
      </Suspense>
    </BackgroundLayout>
  );
}
