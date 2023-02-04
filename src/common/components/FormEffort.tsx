import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEffortDto } from "~/common/dto/effort";
import { Input } from "~/common/components/Input";
import { Button } from "~/common/components/Button";
import { database } from "~/database";
import { ColorPicker } from "./ColorPicker";
import { COLORS } from "~/common/constants/colors";

interface Props {
  closeModal: () => void;
}

export const schema = z.object({
  title: z.string().min(6),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

export const FormEffort = ({ closeModal }: Props) => {
  const form = useForm<CreateEffortDto>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<CreateEffortDto> = async (dto) => {
    const response = await database.efforts.create(dto);

    if (!response.error) {
      closeModal();
      form.reset();
    }
  };

  const onSubmitError: SubmitErrorHandler<CreateEffortDto> = async (dto) => {};

  return (
    <form
      className="h-full grid grid-rows-[1fr_auto]"
      onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
    >
      <div className="flex flex-col gap-8">
        <Input
          label="Title"
          {...form.register("title")}
          type="text"
          placeholder="what are you trying to achieve?"
          error={form.formState.errors?.title?.message}
          required
        />

        <ColorPicker
          label="Color"
          control={form.control}
          name="color"
          required
          items={COLORS}
        />
      </div>

      <Button label="Save Effort" type="submit">
        Save
      </Button>
    </form>
  );

  return <></>;
};
