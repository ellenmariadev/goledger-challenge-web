import { NewEpisodeForm } from "@/app/(pages)/tv-shows/components/Forms/NewEpisodeForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewEpisodePage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewEpisodeForm />
      </Suspense>
    </BackgroundLayout>
  );
}
