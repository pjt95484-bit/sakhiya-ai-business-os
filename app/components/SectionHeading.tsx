type Props = {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
  as?: "h2" | "h3";
};

/**
 * The one section header used everywhere, so eyebrow -> headline -> lead
 * spacing is identical in every section (Part B7).
 *
 * The header spans the full container. When there is a lead, headline and lead
 * sit side by side on large screens: that fills the container width instead of
 * stacking both in a narrow left column, while keeping each measure readable.
 */
export function SectionHeading({ kicker, title, lede, id, as = "h2" }: Props) {
  const Heading = as;
  return (
    <header>
      <p className="kicker">{kicker}</p>
      {lede ? (
        <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <Heading id={id} className="h2">
            {title}
          </Heading>
          <p className="lede lg:mt-0">{lede}</p>
        </div>
      ) : (
        <Heading id={id} className="h2 max-w-[24ch]">
          {title}
        </Heading>
      )}
    </header>
  );
}
