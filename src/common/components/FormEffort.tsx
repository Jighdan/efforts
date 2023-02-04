import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEffortDto } from "~/common/dto/effort";
import { Input } from "~/common/components/Input";
import { Button } from "~/common/components/Button";
import { useStore } from "~/store";

interface Props {
  closeModal: () => void;
}

export const schema = z.object({
  title: z.string(),
});

export const FormEffort = ({ closeModal }: Props) => {
  const store = useStore();
  const form = useForm<CreateEffortDto>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<CreateEffortDto> = async (dto) => {
    await store.addEffort(dto);
    closeModal();
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
        />
      </div>

      <Button label="Save Effort" type="submit">
        Save
      </Button>
    </form>
  );

  return <></>;
};
