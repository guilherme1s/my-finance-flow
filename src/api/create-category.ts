import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface CreateCategoryResponse {
	name: string;
	description: string;
}

export async function createCategory({ name, description }: CreateCategoryResponse) {
	if (isDemo) {
		const storageKey = "categories";

		const storedCategories = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const newCategory = {
			id: crypto.randomUUID(),
			name,
			description,
			createdAt: new Date().toISOString(),
		};

		const updatedStorageCategories = [...storedCategories, newCategory];

		localStorage.setItem(storageKey, JSON.stringify(updatedStorageCategories));

		return newCategory;
	}

	const response = await api.post("/categories", {
		name: name,
		description: description,
		createdAt: new Date().toISOString(),
	});

	return response.data;
}