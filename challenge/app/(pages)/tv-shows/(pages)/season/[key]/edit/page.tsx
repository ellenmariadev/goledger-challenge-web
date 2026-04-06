import { EditSeasonForm } from "@/app/(pages)/tv-shows/components/Forms/EditSeasonForm";
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
    title: `Edit Season ${decodedKey}`,
    description: "Edit a season.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function EditSeasonPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);

  return <EditSeasonForm seasonKey={decodeURIComponent(key)} />;
}
