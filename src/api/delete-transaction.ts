import { api } from "@/lib/axios";

export async function deleteTransaction(id: number) {
	await api.delete(`/transactions/${id}`);
}
