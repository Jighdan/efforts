import { FormSignIn } from "./components/FormSignIn";

export const ViewSignIn = () => {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-2xl">Sign In</h2>

      <FormSignIn />
    </div>
  );
};
