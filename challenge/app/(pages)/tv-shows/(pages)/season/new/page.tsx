import { NewSeasonForm } from "@/app/(pages)/tv-shows/components/NewSeasonForm";
import { Loading } from "@/shared/ui/Loading";
import { Suspense } from "react";

export default function NewSeasonPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewSeasonForm />
    </Suspense>
  );
}
