import { EditEpisodeForm } from "@/app/(pages)/tv-shows/components/Forms/EditEpisodeForm";
import { use } from "react";

export default function EditEpisodePage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return <EditEpisodeForm episodeKey={decodeURIComponent(key)} />;
}
