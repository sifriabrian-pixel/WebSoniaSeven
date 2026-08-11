export default function SectionDivider({
  className = "",
  center = true,
  dark = false,
}: {
  className?: string;
  center?: boolean;
  /** true cuando el divider va sobre un fondo oscuro (maroon): usa cream en vez del mismo maroon. */
  dark?: boolean;
}) {
  return (
    <div
      className={`h-px w-[60px] ${dark ? "bg-cream" : "bg-gold"} ${center ? "mx-auto" : ""} my-4 ${className}`}
    />
  );
}
