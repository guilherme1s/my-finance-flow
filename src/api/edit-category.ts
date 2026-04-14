import { isDemo } from "@/env";
import { api } from "@/lib/axios";
import type { newCategoryFormSchemaType } from "@/pages/category/new-category-form";

interface Category {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}

export async function editCategory(
	id: number,
	{ name, description }: newCategoryFormSchemaType
) {
	const storageKey = "categories";

	if (isDemo) {
		const storedCategory: Category[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const updatedStoredCategory = storedCategory.map((category) =>
			category.id === id
				? {
					...category,
					name,
					description,
				}
				: category
		);

		localStorage.setItem(storageKey, JSON.stringify(updatedStoredCategory));

		return;
	}

	await api.put(`/categories/${id}`, {
		name,
		description,
	});
}