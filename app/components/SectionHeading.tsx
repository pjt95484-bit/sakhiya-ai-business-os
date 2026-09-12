type Props = {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
  as?: "h2" | "h3";
};

/**
 * The one section header used everywhere, so eyebrow -> headline -> lead
 * spacing is identical in every section (Part B7). Spacing comes from the
 * --space-* scale via the .kicker / .h2 / .lede component classes.
 */
export function SectionHeading({ kicker, title, lede, id, as = "h2" }: Props) {
  const Heading = as;
  return (
    <header className="max-w-[46rem]">
      <p className="kicker">{kicker}</p>
      <Heading id={id} className="h2">
        {title}
      </Heading>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
