import { NewTvShowForm } from "@/app/(pages)/tv-shows/components/Forms/NewTvShowForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New TV Show",
  description: "Create a new TV show.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewWatchlistPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewTvShowForm />
      </Suspense>
    </BackgroundLayout>
  );
}
