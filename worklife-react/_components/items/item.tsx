import React from "react";
import style from "./item.module.css";
import Image from "next/image";

const ItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={`${style.itemWrapper} ${style[`${className}`]}`}
    {...props}
  />
));

interface Props {
  className?: string;
  src: string;
}

const ItemImage = ({ className, src }: Props) => (
  <Image
    width={250}
    height={250}
    quality={75}
    className={`${style.itemBackground} ${style[`${className}`]} ${
      style.loading
    }`}
    src={src}
    alt="object image"
    onLoad={(e) => {
      const target = e.target as HTMLImageElement;
      target.classList.remove(style.loading);
    }}
  />
);

const ItemTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div className={style.titleWrapper}>
    <h3 ref={ref} className={style.itemTitle} {...props} />
  </div>
));

const ItemLoader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={`${style.itemLoading}`} />
));

export { ItemWrapper, ItemImage, ItemTitle, ItemLoader };
