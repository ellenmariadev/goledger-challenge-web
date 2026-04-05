import { NewTvShowForm } from "@/app/(pages)/tv-shows/components/NewTvShowForm";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewWatchlistPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewTvShowForm />
    </Suspense>
  );
}
