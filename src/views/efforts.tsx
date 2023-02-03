import { useStore } from "~/store";
import { ScrollArea } from "~/common/components/ScrollArea";
import Link from "next/link";

export const View = () => {
  const { efforts } = useStore();

  return (
    <ScrollArea>
      <ul className="grid auto-rows-fr gap-4">
        {efforts.map((effort) => (
          <li key={effort.id} className="contents">
            <Link
              href={`/efforts/${effort.id}`}
              className="p-4 border-2 border-silver text-silver hover:border-black focus:border-black hover:text-black focus:text-black focus:outline-none rounded-md transition-colors"
            >
              {effort.title}
            </Link>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};
