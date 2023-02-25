import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Routes } from "~/enums/routes";

import { FormFields } from "./fields";
import { schema } from "./schema";

export const FormSignIn = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.data.user) {
      router.push(Routes.HOME);
    }
  };

  const shouldButtonBeDisabled = formState.isSubmitting || !formState.isValid;

  return (
    <form
      className="grid h-full grid-rows-[1fr_auto]"
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
