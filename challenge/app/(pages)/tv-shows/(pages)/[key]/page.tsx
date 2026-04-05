import { Loading } from "@/shared/ui/Loading";
import { Suspense, use } from "react";
import { TvShowDetail } from "../../components/TvShowDetail";

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
