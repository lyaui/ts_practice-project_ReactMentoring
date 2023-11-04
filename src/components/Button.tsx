import { type ComponentPropsWithoutRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isText?: boolean;
  to?: never;
}

interface LinkProps extends ComponentPropsWithoutRef<typeof Link> {
  isText?: boolean;
  to: string;
}

function isLink(props: ButtonProps | LinkProps): props is LinkProps {
  return props.hasOwnProperty('to');
}

function Button(props: ButtonProps | LinkProps) {
  const { pathname } = useLocation();

  let classes = `button ${props?.isText ? 'button--text-only' : ''}`;

  if (isLink(props)) {
    classes =
      pathname === props.to.toLowerCase() ? classes + ' active' : classes;
    return <Link className={classes} {...props} />;
  }
  return <button className={classes} {...props} />;
}

export default Button;
