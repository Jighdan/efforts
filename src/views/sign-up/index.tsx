import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormSignUp } from "./components/FormSignUp";
import { FormFields } from "./form-fields";
import { schema } from "./schema";

export const SignUpView = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    criteriaMode: "firstError",
  });

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-12">
        <h2 className="text-2xl">Sign Up</h2>

        <FormSignUp />
      </div>
    </FormProvider>
  );
};
