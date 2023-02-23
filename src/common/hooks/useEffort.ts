import { EffortDto } from "~/common/dto/effort";
import { useState } from "react";
import { database } from "~/database";
import { useIsomorphicLayoutEffect } from "~/common/hooks/useIsomorphicLayoutEffect";

type ResolvedPromise = Awaited<ReturnType<typeof database.efforts.getById>>;

export const useEffort = (effortId: EffortDto['id']) => {
	const [response, setResponse] = useState<ResolvedPromise>();

	useIsomorphicLayoutEffect(() => {
		const getEffort = async () => {
			const response = await database.efforts.getById(effortId);

			setResponse(response);
		};

		getEffort();

		const realtimeSubscription = database.efforts.subscribeToEffortChanges(effortId, () => getEffort());
		realtimeSubscription.subscribe();

		return () => {
			realtimeSubscription.unsubscribe();
		}
	}, [effortId]);


	return { effort: response?.data || undefined, meta: { error: response?.error, status: response?.statusText } }
}