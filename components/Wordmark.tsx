import Image from "next/image";

const SIZES = {
  sm: {
    mark: 22,
    main: "text-lg tracking-[0.08em]",
    sub: "text-[8px] tracking-[0.2em] mt-0.5",
    gap: "gap-2",
  },
  lg: {
    mark: 40,
    main: "text-2xl tracking-[0.08em] md:text-4xl",
    sub: "text-[11px] tracking-[0.3em] mt-2",
    gap: "gap-3",
  },
};

export default function Wordmark({
  size = "sm",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { mark, main, sub, gap } = SIZES[size];
  return (
    <div className={`flex flex-col items-center ${gap} ${className}`}>
      <Image
        src="/images/brand/mark-white.png"
        alt=""
        width={mark * 1.1}
        height={mark}
        className="shrink-0"
      />
      <div className="text-center">
        <div className={`font-serif ${main}`}>SONIA GARCÍA</div>
        <div className={`text-cream/80 ${sub}`}>SEVEN REAL ESTATE</div>
      </div>
    </div>
  );
}
