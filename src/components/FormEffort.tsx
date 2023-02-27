import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { COLORS } from "~/constants/colors";
import { database } from "~/database";
import { CreateEffortDto } from "~/dto/effort";

import { ColorPicker } from "./ColorPicker";

interface Props {
  closeModal: () => void;
}

export const schema = z.object({
  title: z.string({ required_error: "Please set a title" }).min(6),
  color: z
    .string({ required_error: "Select a color" })
    .regex(/^#[0-9A-F]{6}$/i),
});

type FormFields = Omit<CreateEffortDto, "user_id">;

export const FormEffort = ({ closeModal }: Props) => {
  const user = useUser();

  const { formState, reset, register, handleSubmit, control } =
    useForm<FormFields>({
      resolver: zodResolver(schema),
      shouldFocusError: true,
      criteriaMode: "firstError",
    });

  const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

  const onSubmit: SubmitHandler<FormFields> = async (dto) => {
    if (user) {
      const response = await database.efforts.create({
        ...dto,
        user_id: user.id,
      });

      if (!response.error) {
        closeModal();
        reset();
      }
    }
  };

  return (
    <form
      className="grid h-full grid-rows-[1fr_auto]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        <Input
          label="Title"
          {...register("title")}
          type="text"
          placeholder="what are you trying to achieve?"
          error={formState.errors?.title?.message}
          required
        />

        <ColorPicker label="Color" control={control} name="color" required>
          {COLORS}
        </ColorPicker>
      </div>

      <Button type="submit" disabled={shouldButtonBeDisabled}>
        Save
      </Button>
    </form>
  );
};
