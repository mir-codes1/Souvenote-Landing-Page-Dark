import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    hideArrow?: boolean;
}

function ButtonColorful({
    className,
    label = "Explore Components",
    hideArrow = false,
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-4 overflow-hidden",
                "transition-all duration-300",
                "hover:-translate-y-[2px]",
                "hover:shadow-[0_10px_28px_rgba(212,175,55,0.45)]",
                "group",
                className
            )}
            style={{ background: "#0B0B0F" }}
            {...props}
        >
            {/* Base gradient — always visible */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, #D4AF37, #F1D074, #D4AF37)" }}
            />

            {/* Brightness boost layer — only on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 blur transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, #FFE88A, #F1D074, #FFE88A)" }}
            />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span style={{ color: "#0B0B0F", fontWeight: 700 }}>{label}</span>
                {!hideArrow && <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "rgba(11,11,15,0.8)" }} />}
            </div>
        </Button>
    );
}

export { ButtonColorful }
