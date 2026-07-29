export default function SectionDivider({
  className = "",
  center = true,
}: {
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`gold-line ${center ? "mx-auto" : ""} my-4 ${className}`}
    />
  );
}
