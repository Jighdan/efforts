import { useMemo } from "react";
import { useStore } from "~/store";

export interface ViewProps {
	id: number;
};

export const View = ({ id }: ViewProps) => {
	const { getEffortById } = useStore();
  const effort = useMemo(() => getEffortById(id), [id]);

  return (
    <div>
      <h2>
        {effort?.id} - {effort?.title}
      </h2>

      <ul>
        {effort?.entries.map((entry) => (
          <li key={entry.id}>
            <div>
              <h4>
                {entry?.id} - {entry?.date}
              </h4>
              <p>{entry.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}