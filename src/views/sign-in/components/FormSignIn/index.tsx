import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";

import { FormFields } from "./fields";
import { schema } from "./schema";
import { useRouter } from "next/router";
import { Routes } from "~/enums/routes";

export const FormSignIn = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });

      if (!!response.data.user) {
        router.push(Routes.HOME);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldButtonBeDisabled = formState.isSubmitting || !formState.isValid;

  return (
    <form
      className="h-full grid grid-rows-[1fr_auto]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        <Input
          {...register("email")}
          label="E-mail"
          type="email"
          placeholder="Enter your E-Mail"
          required
          error={formState.errors.email?.message}
        />

        <Input
          {...register("password")}
          label="Password"
          type="password"
          placeholder="Enter your Password"
          required
          error={formState.errors.password?.message}
        />
      </div>

      <Button label="Sign In" type="submit" disabled={shouldButtonBeDisabled}>
        Sign In
      </Button>
    </form>
  );
};
