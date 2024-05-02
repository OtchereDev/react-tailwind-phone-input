import { ComponentProps } from 'react';

interface LazySvgProps extends ComponentProps<"svg"> {
    name: string;
}
export declare const LazySvg: ({ name, ...props }: LazySvgProps) => "..." | import("react/jsx-runtime").JSX.Element | null;
export {};
