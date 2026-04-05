import { api } from "@/lib/axios";
import type { newCategoryFormSchemaType } from "@/pages/category/new-category-form";

export async function editCategory(id: number, { name, description }: newCategoryFormSchemaType) {
	await api.put(`/categories/${id}`, { name, description });
}