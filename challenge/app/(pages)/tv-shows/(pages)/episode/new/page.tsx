import { NewEpisodeForm } from "@/app/(pages)/tv-shows/components/NewEpisodeForm";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewEpisodePage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewEpisodeForm />
    </Suspense>
  );
}
