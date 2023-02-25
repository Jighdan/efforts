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
  };

  return (
    <form
      className="grid h-full grid-rows-[1fr_auto]"
      onSubmit={form.handleSubmit(onSubmit)}
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
