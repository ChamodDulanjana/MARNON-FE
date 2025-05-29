import { useEffect, useState } from "react";

type Breakpoint = number | 'sm' | 'md' | 'lg' | 'xl';

const BREAKPOINTS: Record<Exclude<Breakpoint, number>, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

export function useIsScreenWide(breakpoint: Breakpoint = 'sm') {
    const resolvedBreakpoint = typeof breakpoint === 'number' ? breakpoint : BREAKPOINTS[breakpoint];
    const [isWide, setIsWide] = useState(() => window.innerWidth > resolvedBreakpoint);

    useEffect(() => {
        const handleResize = () => setIsWide(window.innerWidth > resolvedBreakpoint);
        handleResize(); // in case resize happened before mounting

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [resolvedBreakpoint]);

    return isWide;
}
