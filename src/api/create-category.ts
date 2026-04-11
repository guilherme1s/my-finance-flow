import { api } from "@/lib/axios";

interface CreateCategoryResponse {
	name: string;
	description: string;
}

export async function createCategory({ name, description }: CreateCategoryResponse) {
	const response = await api.post("/categories", {
		name: name,
		description: description,
		createdAt: new Date().toISOString(),
	});

	return response.data;
}