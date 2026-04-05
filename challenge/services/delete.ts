import { api } from "@/services/api";

export async function deleteAsset<TAssetType extends string>(
	assetType: TAssetType,
	key: string
) {
	return api<unknown, { key: { "@assetType": TAssetType; "@key": string } }>(
		"/invoke/deleteAsset",
		{
			method: "DELETE",
			body: {
				key: {
					"@assetType": assetType,
					"@key": key,
				},
			},
		}
	);
}
