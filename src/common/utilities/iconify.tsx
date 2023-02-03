import { cloneElement, HTMLAttributes } from 'react';
import {Root} from '@radix-ui/react-accessible-icon';

type Props = Pick<HTMLAttributes<HTMLOrSVGElement>, 'className' | 'onClick'>;

export const Icon = (label: string, svgElement: JSX.Element) => {
  return ({ className = '', onClick }: Props) => {
    const element = cloneElement(svgElement, { className, onClick });

    return <Root label={label}>{element}</Root>;
  };
};
