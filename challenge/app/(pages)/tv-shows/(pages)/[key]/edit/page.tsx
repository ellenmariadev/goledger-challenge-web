import { EditTvShowForm } from "@/app/(pages)/tv-shows/components/Forms/EditTvShowForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { use } from "react";

export default function EditTvShowPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return (
    <BackgroundLayout>
      <EditTvShowForm tvShowKey={decodeURIComponent(key)} />
    </BackgroundLayout>
  );
}
