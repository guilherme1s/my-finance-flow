import { api } from "@/lib/axios";

interface CategoryType {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}

export async function getCategories() {
	const response = await api.get<CategoryType[]>("/categories");

	return [...response.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}