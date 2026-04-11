import { api } from "@/lib/axios";
import type { TransactionsType } from "@/pages/transaction/transaction-table-body-content";

export async function getTransactions() {
	const response = await api.get<TransactionsType[]>('/transactions');

	return [...response.data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}