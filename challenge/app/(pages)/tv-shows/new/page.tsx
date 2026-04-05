import { TvShowForm } from "@/shared/components/TvShowForm";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewWatchlistPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TvShowForm />
    </Suspense>
  );
}
