import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface Category {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}

export async function deleteCategory(id: number) {
	const storageKey = "categories";

	if (isDemo) {
		const storageCategory: Category[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const updatedStorageCategory = storageCategory.filter((storageCategory) => storageCategory.id !== id);

		localStorage.setItem(storageKey, JSON.stringify(updatedStorageCategory));

		return;
	}

	await api.delete(`/categories/${id}`);
}