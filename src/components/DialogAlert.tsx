import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from "@radix-ui/react-alert-dialog";
import { Root as Hidden } from "@radix-ui/react-visually-hidden";
import { PropsWithChildren } from "react";

import { Button } from "~/components/Button";

interface Props extends PropsWithChildren {
  action: () => void;
  actionText: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  cancelText?: string;
}

export const DialogAlert = ({
  isOpen = false,
  onOpenChange,
  title,
  description,
  cancelText,
  actionText,
  action,
  children,
}: Props) => (
  <Root open={isOpen} onOpenChange={onOpenChange}>
    <Portal>
      <Overlay className="fade-in fixed inset-0 backdrop-blur-sm" />

      <Content className="fixed-center flex max-w-xs flex-col gap-4 bg-white">
        <Title className="text-lg font-bold">{title}</Title>

        <Hidden>
          <Description>{description}</Description>
        </Hidden>

        <div>{children}</div>

        <footer className="flex gap-4">
          {cancelText && (
            <Cancel>
              <Button variant="outlined">{cancelText}</Button>
            </Cancel>
          )}

          <Action>
            <Button onClick={action}>{actionText}</Button>
          </Action>
        </footer>
      </Content>
    </Portal>
  </Root>
);
