import { NewEpisodeForm } from "@/app/(pages)/tv-shows/components/Forms/NewEpisodeForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Episode",
  description: "Create a new episode for a TV show.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewEpisodePage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewEpisodeForm />
      </Suspense>
    </BackgroundLayout>
  );
}
