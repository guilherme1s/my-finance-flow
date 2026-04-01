import { api } from "@/lib/axios";
import type { newTransactionFormSchemaType } from "@/pages/transaction/new-transaction-form";

export async function editTransaction(id: number, { amount, category, description, type }: newTransactionFormSchemaType) {
	await api.put(`/transactions/${id}`, {
		amount,
		category,
		date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
		description,
		type,
	});
}
