import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Select } from "~/components/Select";
import { database } from "~/database";
import { EffortDto } from "~/dto/effort";
import { CreateEffortEntryDto } from "~/dto/effort-entry";

interface Props {
  closeModal: () => void;
  efforts: EffortDto[];
}

const schema = z.object({
  description: z.string(),
  date: z.date().optional(),
  effort_id: z.preprocess(
    (value) => parseInt(z.string().parse(value), 10),
    z.number().positive()
  ),
});

export const FormEffortEntry = ({ efforts, closeModal }: Props) => {
  const form = useForm<CreateEffortEntryDto>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<CreateEffortEntryDto> = async (dto) => {
    const entry: CreateEffortEntryDto = {
      date: new Date().toISOString(),
      description: dto.description,
      effort_id: dto.effort_id,
    };

    const response = await database.entries.create(entry);

    if (!response.error) {
      form.reset();
      closeModal();
    }
  };

  return (
    <form
      className="grid h-full grid-rows-[1fr_auto]"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        <Input
          label="Description"
          {...form.register("description")}
          type="text"
          placeholder="a brief of the event"
          error={form.formState.errors?.description?.message}
          autoComplete="off"
        />

        <Select
          label="Effort"
          control={form.control}
          name="effort_id"
          placeholder="towards which effort"
        >
          {efforts.map((effort) => ({
            value: `${effort.id}`,
            label: effort.title,
          }))}
        </Select>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
};
