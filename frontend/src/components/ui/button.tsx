import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

  // const buttonClass = "text-lg font-bold py-6 px-8 rounded-2xl transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-lg font-bold py-6 px-8 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gray-700 text-green-400 hover:bg-gray-600",
        destructive: "bg-gradient-to-r from-red-700 to-red-500 text-white",
        outline: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-white",
        secondary: "bg-gradient-to-r from-green-600 to-green-400 text-white",
        ghost: "bg-gradient-to-r from-blue-600 to-blue-400 text-white",
      },
      size: {
        default: "h-14 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }