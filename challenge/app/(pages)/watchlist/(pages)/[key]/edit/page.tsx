import { EditWatchlistForm } from "@/app/(pages)/watchlist/components/EditWatchlistForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense, use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);

  return {
    title: `Edit Watchlist ${decodedKey}`,
    description: "Edit a watchlist.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

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
