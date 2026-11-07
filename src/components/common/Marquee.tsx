import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
}

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
export default function Marquee({ items, className, reverse = false, separator = "•" }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div
        className={cn("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap">{item}</span>
            <span aria-hidden="true" className="mx-6 opacity-40">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
