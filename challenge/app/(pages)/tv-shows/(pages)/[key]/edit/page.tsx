import { EditTvShowForm } from "@/app/(pages)/tv-shows/components/EditTvShowForm";
import { use } from "react";

export default function EditTvShowPage({
	params,
}: {
	params: Promise<{ key: string }>;
}) {
	const { key } = use(params);

	return <EditTvShowForm tvShowKey={decodeURIComponent(key)} />;
}

