export default function DataPlaceholder({
  suffix = "",
  className = "",
  dark = false,
}: {
  suffix?: string;
  className?: string;
  /** true cuando el placeholder va sobre un fondo oscuro (maroon). */
  dark?: boolean;
}) {
  return (
    <span
      className={`border-b border-dashed opacity-60 ${dark ? "border-cream" : "border-gold"} ${className}`}
      title="Pendiente: completar con el dato real"
    >
      [DATO]{suffix}
    </span>
  );
}
