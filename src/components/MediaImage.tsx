import { motion, type ComponentProps } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type MediaImageProps = Omit<ComponentProps<typeof motion.img>, "src"> & {
  src: string;
};

export function MediaImage({ src, alt, className, onError, ...props }: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-muted/30 px-4 text-center text-xs text-muted-foreground",
          className,
        )}
      >
        <span>Media unavailable</span>
      </div>
    );
  }

  return (
    <motion.img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}