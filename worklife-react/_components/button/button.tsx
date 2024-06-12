import React from "react";

import style from "./button.module.css";

export default React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`${style.button} ${style[`${className}`]}`}
    {...props}
  />
));
