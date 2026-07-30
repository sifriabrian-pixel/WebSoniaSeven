const SIZES = {
  sm: {
    main: "text-lg tracking-[0.2em]",
    sub: "text-[8px] tracking-[0.15em] mt-0.5",
  },
  lg: {
    main: "text-2xl tracking-[0.25em] md:text-3xl",
    sub: "text-[10px] tracking-[0.15em] mt-1",
  },
};

export default function Wordmark({
  size = "sm",
  className = "",
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { main, sub } = SIZES[size];
  return (
    <div className={className}>
      <div className={`font-serif ${main}`}>SEVEN INMOBILIARIA</div>
      <div
        className={`text-gold ${sub} [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]`}
      >
        By Sonia García
      </div>
    </div>
  );
}
