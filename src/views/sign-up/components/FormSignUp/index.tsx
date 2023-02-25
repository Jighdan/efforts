import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Routes } from "~/enums/routes";

import { FormFields } from "./fields";
import { schema } from "./schema";

export const FormSignUp = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<FormFields> = async (credentials) => {
    const response = await supabase.auth.signUp(credentials);

    if (response.data.user) {
      router.push(Routes.SIGN_IN);
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
          placeholder="E-Mail"
          required
          error={formState.errors.email?.message}
        />

        <Input
          {...register("password")}
          label="Password"
          type="password"
          placeholder="Provide a secure password"
          required
          error={formState.errors.password?.message}
        />

        <Input
          {...register("passwordConfirmation")}
          label="Confirm Password"
          type="password"
          placeholder="Please confirm the password"
          required
          error={formState.errors.password?.message}
        />
      </div>

      <Button label="Sign Up" type="submit" disabled={shouldButtonBeDisabled}>
        Sign Up
      </Button>
    </form>
  );
};
