import { api } from "@/lib/axios";

interface CreateTransactionResponse {
	amount: number;
	category: string;
	description: string;
	type: "Receita" | "Despesa";
}

export async function createTransaction({ amount, category, description, type }: CreateTransactionResponse) {
	await api.post('/transactions', {
		amount,
		category,
		date: new Date().toISOString(),
		description,
		type,
	});
}
