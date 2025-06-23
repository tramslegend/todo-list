import { cn } from "@/lib/utils";
import React from "react";

export function TypographyH1({ children, className, ...props }: React.ComponentProps<"h1">) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)}{...props}>
            {children}
        </h1>
    )
}

export function TypographyH2({ children, className, ...props }: React.ComponentProps<"h2">) {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}{...props}>
            {children}
        </h2>
    )
}

export function TypographyH3({ children, className, ...props }: React.ComponentProps<"h3">) {
    return (
        <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}{...props}>
            {children}
        </h3>
    )
}

export function TypographyH4({ children, className, ...props }: React.ComponentProps<"h4">) {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}{...props}>
            {children}
        </h4>
    )
}

export function TypographyP({ children, className, ...props }: React.ComponentProps<"p">) {
    return (
        <p className={cn("text-[14px]", className)}{...props}>
            {children}
        </p>
    )
}

export function TypographyBlockquote({ children, className, ...props }: React.ComponentProps<"blockquote">) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}{...props}>
            {children}
        </blockquote>
    )
}

export function TypographySmall({ children, className, ...props }: React.ComponentProps<"small">) {
    return (
        <small className={cn("text-xs leading-none ", className)}{...props}>
            {children}
        </small>
    )
}