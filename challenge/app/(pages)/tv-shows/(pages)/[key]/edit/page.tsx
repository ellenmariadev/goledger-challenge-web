import { EditTvShowForm } from "@/app/(pages)/tv-shows/components/Forms/EditTvShowForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
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
    title: `Edit TV Show ${decodedKey}`,
    description: "Edit a TV show.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

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
