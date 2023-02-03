import { ReactNode, createContext, useContext, useState } from "react";
import { EffortDto } from "~/common/dto/effort";
import { EffortEntryDto, CreateEffortEntryDto } from "~/common/dto/effort-entry";

interface State {
  efforts: EffortDto[];
	getEffortById: (id: EffortDto['id']) => (EffortDto & { entries: EffortEntryDto[] }) | undefined;
	effortEntries: EffortEntryDto[];
	addEffortEntry: (dto: CreateEffortEntryDto) => void;
}

const defaultState: State = {
  efforts: [],
	getEffortById: () => undefined,
	effortEntries: [],
	addEffortEntry: () => {}
};

const Context = createContext(defaultState);

export const useStore = () => useContext(Context);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [efforts, setEfforts] = useState<EffortDto[]>([
    { id: 1, title: "eat healthier", created_at: new Date().toISOString() },
    { id: 2, title: "meditate in the mornings", created_at: new Date().toISOString() },
		{ id: 3, title: "work on my creativity", created_at: new Date().toISOString() },
  ]);

	const [effortEntries, setEffortEntries] = useState<EffortEntryDto[]>([
		{ id: 1, effort_id: 1, description: 'had yogurt with nuts for breakfast', date: new Date().toISOString(), created_at: new Date().toISOString() },
		{ id: 2, effort_id: 1, description: 'had dinner early', date: new Date().toISOString(), created_at: new Date().toISOString() },
		{ id: 3, effort_id: 2, description: 'did a 10 minute meditation', date: new Date().toISOString(), created_at: new Date().toISOString() },
		{ id: 4, effort_id: 3, description: 'spent afternoon drawing', date: new Date().toISOString(), created_at: new Date().toISOString() },
		{ id: 5, effort_id: 1, description: "didn't buy candy when felt tempted", date: new Date().toISOString(), created_at: new Date().toISOString() }
	]);

	const getEffortById: State['getEffortById'] = (id) => {
		const effort = efforts.find(effort => effort.id === id);

		if (effort) {
			const entries = effortEntries.filter(entry => entry.effort_id === id);
			return { ...effort, entries };
		};

		return undefined;
	};

  const addEffortEntry: State['addEffortEntry'] = (dto) => {
		console.info(dto);
  };

  return (
    <Context.Provider value={{ efforts, effortEntries, getEffortById, addEffortEntry }}>
      {children}
    </Context.Provider>
  );
};
