import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import { Root as Hidden } from "@radix-ui/react-visually-hidden";
import { WithChildren } from "~/interfaces/with-children";
import { useLayoutRefContext } from "~/contexts/layout-ref";
import { IconClose } from "~/assets/icons/IconClose";

interface Props extends WithChildren {
  isOpen: boolean;
  onStateChange: (state: boolean) => void;
  title: string;
  description: string;
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
          className="fixed inset-0 z-20 backdrop-blur-sm bg-black radix-state-open:animate-fade-in radix-state-closed:animate-fade-out"
        />

        <Content className="h-screen max-h-screen container max-sm:px-8 md:py-8 fixed z-30 top-0 radix-state-open:animate-fade-down radix-state-closed:animate-fade-up flex flex-col gap-8">
          <div className="flex justify-between">
            <Title className="text-white text-xl">{title}</Title>
            <Hidden>
              <Description>{description}</Description>
            </Hidden>
            <Close>
              <IconClose className="size-sm stroke-white" />
            </Close>
          </div>

          {children}
        </Content>
      </Portal>
    </Root>
  );
};
