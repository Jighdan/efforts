import * as Primitive from "@radix-ui/react-select";
import { ComponentProps, ReactNode } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface Props<FormFields extends FieldValues>
  extends UseControllerProps<FormFields>,
    SharedProps {
  children: Item[];
  label: string;
}

export interface PropsWithoutControl
  extends PrimitiveRootProps,
    SharedProps,
    PrimitiveValueProps {
  items: Item[];
}

interface Item extends PrimitiveItemProps {
  label: ReactNode;
}

type SharedProps = Pick<PrimitiveRootProps, "required" | "disabled"> &
  Pick<PrimitiveValueProps, "placeholder">;

type PrimitiveRootProps = Pick<
  ComponentProps<typeof Primitive.Root>,
  "required" | "disabled" | "value" | "onValueChange" | "name"
>;

type PrimitiveValueProps = Pick<
  ComponentProps<typeof Primitive.Value>,
  "placeholder"
>;

type PrimitiveItemProps = Pick<
  ComponentProps<typeof Primitive.Item>,
  "value" | "disabled"
>;
