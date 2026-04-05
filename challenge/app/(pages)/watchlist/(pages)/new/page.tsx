import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";
import { NewWatchlistForm } from "@/app/(pages)/watchlist/components/NewWatchlistForm";

export default function NewWatchlistPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewWatchlistForm />
    </Suspense>
  );
}
