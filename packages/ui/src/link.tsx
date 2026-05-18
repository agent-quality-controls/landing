"use client";
import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
  type AnchorHTMLAttributes,
  type ReactElement,
} from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const DefaultAnchor: ComponentType<LinkProps> = ({ children, ...rest }) => (
  <a {...rest}>{children}</a>
);

export const LinkContext =
  createContext<ComponentType<LinkProps>>(DefaultAnchor);

export const useLink = (): ComponentType<LinkProps> => useContext(LinkContext);

export interface LinkProviderProps {
  value: ComponentType<LinkProps>;
  children: ReactNode;
}

export function LinkProvider({
  value,
  children,
}: LinkProviderProps): ReactElement {
  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export const Link: ComponentType<LinkProps> = (props) => {
  const L = useLink();
  return <L {...props} />;
};
