import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from "@radix-ui/react-dialog";
import { Root as Hidden } from "@radix-ui/react-visually-hidden";

import { IconClose } from "~/assets/icons/IconClose";
import { useLayoutRefContext } from "~/contexts/layout-ref";
import { WithChildren } from "~/interfaces/with-children";

interface Props extends WithChildren {
  description: string;
  isOpen: boolean;
  onStateChange: (state: boolean) => void;
  title: string;
}

export const Modal = ({
  isOpen = false,
  onStateChange,
  title,
  description,
  children,
}: Props) => {
  const container = useLayoutRefContext();

  return (
    <Root open={isOpen} onOpenChange={onStateChange}>
      <Portal container={container.ref?.current}>
        <Overlay
          forceMount
          className="fixed inset-0 z-20 bg-white backdrop-blur-sm radix-state-closed:animate-fade-out radix-state-open:animate-fade-in"
        />

        <Content className="container fixed top-0 z-30 flex h-screen max-h-screen flex-col gap-8 radix-state-closed:animate-fade-up radix-state-open:animate-fade-down max-sm:px-8 md:py-8">
          <div className="flex justify-between">
            <Title className="text-xl text-black">{title}</Title>
            <Hidden>
              <Description>{description}</Description>
            </Hidden>
            <Close>
              <IconClose className="stroke-black size-sm" />
            </Close>
          </div>

          {children}
        </Content>
      </Portal>
    </Root>
  );
};
