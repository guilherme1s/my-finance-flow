import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface CreateTransactionResponse {
	amount: number;
	category: string;
	description: string;
	type: "Receita" | "Despesa";
}

export async function createTransaction({
	amount,
	category,
	description,
	type,
}: CreateTransactionResponse) {
	const storageKey = "transactions";

	if (isDemo) {
		const storedTransactions = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const newTransaction = {
			id: crypto.randomUUID(),
			amount,
			category,
			description,
			type,
			date: new Date().toISOString(),
		};

		const updatedStoredTransactions = [...storedTransactions, newTransaction];

		localStorage.setItem(storageKey, JSON.stringify(updatedStoredTransactions));

		return newTransaction;
	}

	const response = await api.post("/transactions", {
		amount,
		category,
		date: new Date().toISOString(),
		description,
		type,
	});

	return response.data;
}