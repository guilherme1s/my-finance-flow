import { isDemo } from "@/env";
import { api } from "@/lib/axios";
import type { TransactionsType } from "@/pages/transaction/transaction-table-body-content";

export async function getTransactions() {
	const storageKey = "transactions";

	if (isDemo) {
		const data: TransactionsType[] = (() => {
			try {
				return JSON.parse(localStorage.getItem(storageKey) || "[]");
			} catch {
				return [];
			}
		})();

		return [...data].sort(
			(a, b) =>
				new Date(b.date).getTime() -
				new Date(a.date).getTime()
		);
	}

	const response = await api.get<TransactionsType[]>("/transactions");

	return [...response.data].sort(
		(a, b) =>
			new Date(b.date).getTime() -
			new Date(a.date).getTime()
	);
}