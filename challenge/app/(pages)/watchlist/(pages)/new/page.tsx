import { NewWatchlistForm } from "@/app/(pages)/watchlist/components/NewWatchlistForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewWatchlistPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewWatchlistForm />
      </Suspense>
    </BackgroundLayout>
  );
}
