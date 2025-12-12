import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"
import React from "react"

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    glass?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, glass = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-[25px] overflow-hidden",
                    glass ? "glass-card" : "bg-zinc-900 border border-zinc-800",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)
Card.displayName = "Card"
