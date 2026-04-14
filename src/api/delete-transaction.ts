import { isDemo } from "@/env";
import { api } from "@/lib/axios";

interface Transaction {
	id: number;
	amount: number;
	category: string;
	description: string;
	type: "Receita" | "Despesa";
}

export async function deleteTransaction(id: number) {
	const storageKey = "transactions";

	if (isDemo) {
		const storedTransaction: Transaction[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const updatedStoredTransaction = storedTransaction.filter((transaction) => transaction.id !== id);

		localStorage.setItem(storageKey, JSON.stringify(updatedStoredTransaction));

		return;
	}

	await api.delete(`/transactions/${id}`);
}