import * as React from "react"
import { forwardRef, HTMLAttributes } from "react"
import { cn } from "../../../lib/utils"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border border-slate-200 bg-white text-slate-900 transition-all duration-300", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("flex flex-col space-y-1.5 p-6", className)} 
      {...props} 
    />
  )
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)} 
      {...props} 
    />
  )
)
CardTitle.displayName = "CardTitle"

export const CardDescription = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("text-sm text-slate-500", className)} 
      {...props} 
    />
  )
)
CardDescription.displayName = "CardDescription"

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("p-6 pt-0", className)} 
      {...props} 
    />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { CardFooter }
