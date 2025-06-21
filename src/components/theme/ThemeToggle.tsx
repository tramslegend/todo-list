"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // avoid hydration mismatch

    return (
        <Button
            className={`rounded-full border h-full aspect-square px-0 py-0 text-accent-foreground grid place-items-center ${className}`}
            size="icon"
            variant="outline"
            title={theme === "dark" ? "Light Theme" : "Dark Theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Moon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
            <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:inline" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
