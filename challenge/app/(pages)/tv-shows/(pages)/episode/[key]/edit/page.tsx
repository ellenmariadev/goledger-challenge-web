import { EditEpisodeForm } from "@/app/(pages)/tv-shows/components/Forms/EditEpisodeForm";
import type { Metadata } from "next";
import { use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);

  return {
    title: `Edit Episode ${decodedKey}`,
    description: "Edit an episode.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function EditEpisodePage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return <EditEpisodeForm episodeKey={decodeURIComponent(key)} />;
}
