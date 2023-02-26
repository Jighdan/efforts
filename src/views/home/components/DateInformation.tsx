import { getLocaleDate } from "~/utilities/date";

export const DateInformation = () => {
  const date = getLocaleDate();

  return (
    <h1 className="flex flex-col">
      <span className="text-xl">
        {date.month} {date.day}
      </span>
      <span className="text-4xl">{date.weekday}</span>
    </h1>
  );
};
