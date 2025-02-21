import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="skeleton"
      className={cn("bg-gray-900/10 animate-pulse rounded-md dark:bg-gray-50/10", className)}
      {...props} />)
  );
}

export { Skeleton }
