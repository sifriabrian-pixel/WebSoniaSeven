export default function DataPlaceholder({
  suffix = "",
  className = "",
}: {
  suffix?: string;
  className?: string;
}) {
  return (
    <span
      className={`border-b border-dashed border-gold/60 opacity-60 ${className}`}
      title="Pendiente: completar con el dato real"
    >
      [DATO]{suffix}
    </span>
  );
}
