import { NewTvShowForm } from "@/app/(pages)/tv-shows/components/Forms/NewTvShowForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewWatchlistPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewTvShowForm />
      </Suspense>
    </BackgroundLayout>
  );
}
