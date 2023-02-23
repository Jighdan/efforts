import { FormSignUp } from "./components/FormSignUp";

export const SignUpView = () => {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-2xl">Sign Up</h2>

      <FormSignUp />
    </div>
  );
};
