import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface CategoryType {
	id: string;
	name: string;
	description: string;
	createdAt: string;
}

export async function getCategories() {
	const storageKey = "categories";

	if (isDemo) {
		const data = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		return [...data].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		);
	}

	const response = await api.get<CategoryType[]>("/categories");

	return [...response.data].sort(
		(a, b) =>
			new Date(b.createdAt).getTime() -
			new Date(a.createdAt).getTime()
	);
}