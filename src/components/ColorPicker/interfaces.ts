import * as Primitive from "@radix-ui/react-radio-group";
import { ComponentProps, ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface Props<FormFields extends FieldValues>
  extends UseControllerProps<FormFields>,
    SharedProps {
  children: Item[];
  label: string;
}

export interface PropsWithoutControl extends PrimitiveRootProps, SharedProps {
  items: Item[];
  error?: string;
}

type SharedProps = Pick<PrimitiveRootProps, "disabled" | "required">;

interface Item extends PrimitiveItemProps {
  label: ReactNode;
}

type PrimitiveRootProps = Pick<
  ComponentProps<typeof Primitive.Root>,
  "name" | "value" | "onValueChange" | "disabled" | "required"
>;

type PrimitiveItemProps = Pick<
  ComponentProps<typeof Primitive.Item>,
  "value" | "disabled"
>;
