import { NewSeasonForm } from "@/app/(pages)/tv-shows/components/Forms/NewSeasonForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Season",
  description: "Create a new season for a TV show.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewSeasonPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewSeasonForm />
      </Suspense>
    </BackgroundLayout>
  );
}
