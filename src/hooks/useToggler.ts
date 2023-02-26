import { useState } from "react";

export const useToggler = (): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return [isToggled, toggle];
};
