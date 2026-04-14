import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface Category {
	id: string;
	name: string;
	description: string;
	createdAt: string;
}

export async function deleteCategory(id: string) {
	const STORAGE_KEY = "categories";

	if (isDemo) {
		const storageCategory: Category[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
			} catch {
				return [];
			}
		})();

		const updatedStorageCategory = storageCategory.filter((storageCategory) => storageCategory.id !== id);

		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStorageCategory));

		return;
	}

	await api.delete(`/categories/${id}`);
}