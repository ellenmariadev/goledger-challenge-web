import { NewSeasonForm } from "@/app/(pages)/tv-shows/components/NewSeasonForm";
import BackgroundLayout from "@/shared/components/BackgroundLayout";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewSeasonPage() {
  return (
    <BackgroundLayout>
      <Suspense fallback={<Loading />}>
        <NewSeasonForm />
      </Suspense>
    </BackgroundLayout>
  );
}
