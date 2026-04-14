import { isDemo } from "@/env";
import { api } from "@/lib/axios";
import type { newTransactionFormSchemaType } from "@/pages/transaction/new-transaction-form";

interface Transaction {
	id: string;
	amount: number;
	category: string;
	description: string;
	type: "Receita" | "Despesa";
}

export async function editTransaction(
	id: string,
	{ amount, category, description, type }: newTransactionFormSchemaType
) {
	const storageKey = "transactions";

	if (isDemo) {
		const currentTransactions: Transaction[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		const updatedCurrentTransactions = currentTransactions.map((transaction) =>
			transaction.id === id
				? {
					...transaction,
					amount,
					category,
					description,
					type,
					date: new Date().toISOString(),
				}
				: transaction
		);

		localStorage.setItem(storageKey, JSON.stringify(updatedCurrentTransactions));

		return;
	}

	await api.put(`/transactions/${id}`, {
		amount,
		category,
		date: new Date().toISOString(),
		description,
		type,
	});
}