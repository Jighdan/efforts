import { z } from "zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEffortDto } from "~/dto/effort";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { database } from "~/database";
import { ColorPicker } from "./ColorPicker";
import { COLORS } from "~/constants/colors";
import { useUser } from "@supabase/auth-helpers-react";

interface Props {
  closeModal: () => void;
}

export const schema = z.object({
  title: z.string().min(6),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});

type FormFields = Omit<CreateEffortDto, "user_id">;

export const FormEffort = ({ closeModal }: Props) => {
  const user = useUser();

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<FormFields> = async (dto) => {
    try {
      if (user) {
        const response = await database.efforts.create({
          ...dto,
          user_id: user.id,
        });

        if (!response.error) {
          closeModal();
          form.reset();
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmitError: SubmitErrorHandler<FormFields> = async (dto) => {};

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

        <ColorPicker label="Color" control={form.control} name="color" required>
          {COLORS}
        </ColorPicker>
      </div>

      <Button label="Save Effort" type="submit">
        Save
      </Button>
    </form>
  );
};
