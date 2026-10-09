export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-edge">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-mist">{description}</p>
      )}
    </div>
  );
}
