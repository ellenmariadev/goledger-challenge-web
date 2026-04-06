import { EditWatchlistForm } from "@/app/(pages)/watchlist/components/EditWatchlistForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import { Suspense, use } from "react";

export default function EditWatchlistPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const slug = decodeURIComponent(key);

  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <EditWatchlistForm watchlistSlug={slug} />
      </Suspense>
    </BackgroundLayout>
  );
}
