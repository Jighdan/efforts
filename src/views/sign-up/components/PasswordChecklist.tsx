import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { FormFields } from "../form-fields";
import { PasswordChecklistItem } from "./PasswordChecklistItem";

export const PasswordChecklist = () => {
  const { watch } = useFormContext<FormFields>();
  const fieldPassword = watch("password");
  const fieldPasswordConfirmation = watch("passwordConfirmation");

  const checks = useMemo<[string, boolean][]>(
    () => [
      [
        "Has a lowercase letter",
        fieldPassword?.toUpperCase() !== fieldPassword,
      ],
      [
        "Has an uppercase letter",
        fieldPassword?.toLowerCase() !== fieldPassword,
      ],
      ["Has a number", /\d/.test(fieldPassword)],
      ["Has at least 8 characters", fieldPassword?.length >= 8],
      [
        "Passwords match",
        !!fieldPassword && fieldPassword === fieldPasswordConfirmation,
      ],
    ],
    [fieldPassword, fieldPasswordConfirmation]
  );

  return (
    <ul className="flex flex-col gap-2">
      {checks.map(([label, isChecked]) => (
        <PasswordChecklistItem
          key={label.split(" ").join("-").toLowerCase()}
          label={label}
          isChecked={isChecked}
        />
      ))}
    </ul>
  );
};
