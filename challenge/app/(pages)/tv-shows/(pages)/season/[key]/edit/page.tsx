import { EditSeasonForm } from "@/app/(pages)/tv-shows/components/EditSeasonForm";
import { use } from "react";

export default function EditSeasonPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return <EditSeasonForm seasonKey={decodeURIComponent(key)} />;
}
