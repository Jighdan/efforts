import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EffortDto } from "~/common/dto/effort";
import { CreateEffortEntryDto } from "~/common/dto/effort-entry";
import { Input } from "~/common/components/Input";
import { Button } from "~/common/components/Button";
import { Select } from "~/common/components/Select";
import { useStore } from "~/store";

interface Props {
  efforts: EffortDto[];
  closeModal: () => void;
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
  const { addEffortEntry } = useStore();

  const form = useForm<CreateEffortEntryDto>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<CreateEffortEntryDto> = async (dto) => {
    await addEffortEntry({
      date: new Date().toUTCString(),
      description: dto.description,
      effort_id: dto.effort_id,
    });

    form.reset();
    closeModal();
  };

  const onSubmitError: SubmitErrorHandler<CreateEffortEntryDto> = async (
    dto
  ) => {
    console.error(dto);
  };

  return (
    <form
      className="h-full grid grid-rows-[1fr_auto]"
      onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
    >
      <div className="flex flex-col gap-8">
        <Input
          label="Description"
          {...form.register("description")}
          type="text"
          placeholder="a brief of the event"
          error={form.formState.errors?.description?.message}
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

      <Button label="Save entry" type="submit">
        Save
      </Button>
    </form>
  );
};
