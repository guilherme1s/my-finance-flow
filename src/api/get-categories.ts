import { api } from "@/lib/axios";

interface CategoryType {
	id: number;
	name: string;
	description: string;
}

export async function getCategories() {
	const response = await api.get<CategoryType[]>("/categories");

	return response.data;
}