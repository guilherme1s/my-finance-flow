import { api } from "@/lib/axios";
import type { newCategoryFormSchemaType } from "@/pages/category/new-category-form";

export async function createCategory({ name, description }: newCategoryFormSchemaType) {
	const response = await api.post("/categories", {
		name: name,
		description: description
	});

	return response.data;
}