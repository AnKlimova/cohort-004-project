import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

export function StarDisplay({
  averageRating,
  reviewCount,
  className,
}: {
  averageRating: number | null;
  reviewCount: number;
  className?: string;
}) {
  if (reviewCount === 0 || averageRating === null) return null;

  const display = (Math.round(averageRating * 10) / 10).toFixed(1);
  const filled = Math.round(averageRating);

  return (
    <span className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-3.5",
            star <= filled
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          )}
        />
      ))}
      <span className="ml-0.5 text-sm font-medium">{display}</span>
      <span className="text-sm text-muted-foreground">({reviewCount})</span>
    </span>
  );
}

export function StarRatingInput({
  userRating,
  onRate,
  disabled,
}: {
  userRating: number | null;
  onRate: (rating: number) => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? userRating ?? 0;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && onRate(star)}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          disabled={disabled}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "size-7 transition-colors",
              star <= active
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground hover:text-yellow-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
