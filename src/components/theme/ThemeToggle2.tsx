"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle2({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // avoid hydration mismatch
    const commonClass = 'rounded-full p-1 cursor-pointer';
    return (
        <span className="flex items-center gap-0.5 border rounded-full">
            <button className={`${commonClass} ${theme === 'light' && "bg-primary text-primary-foreground"}`} onClick={() => setTheme('light')}><Sun size={15} /></button>
            <button className={`${commonClass} ${theme === 'dark' && "bg-primary text-primary-foreground"}`} onClick={() => setTheme('dark')}><Moon size={15} /></button>
        </span>
    );
}
