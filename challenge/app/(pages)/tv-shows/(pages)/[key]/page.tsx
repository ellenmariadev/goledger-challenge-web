import { Loading } from "@/shared/ui/Loading";
import type { Metadata } from "next";
import { Suspense, use } from "react";
import { TvShowDetail } from "../../components/TvShowDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);
  const canonical = `/tv-shows/${encodeURIComponent(decodedKey)}`;

  return {
    title: `TV Show ${decodedKey}`,
    description: "TV show details, seasons, and episodes.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: `TV Show ${decodedKey}`,
      description: "TV show details, seasons, and episodes.",
      url: canonical,
    },
  };
}

export default function TvShowDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return (
    <Suspense fallback={<Loading />}>
      <TvShowDetail tvShowKey={decodeURIComponent(key)} />
    </Suspense>
  );
}
