import type { ReactNode } from "react";


export default function Container({ children, className }: { children?: ReactNode; className?: string }) {
    return (
        <section className={`container mx-auto px-3 max-w-[1200px] ${className}`}>
            {children}
        </section>
    )
}
