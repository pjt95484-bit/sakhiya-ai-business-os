type Props = {
  kicker: string;
  title: string;
  lede?: React.ReactNode;
  id?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({ kicker, title, lede, id, as = "h2" }: Props) {
  const Heading = as;
  return (
    <header className="max-w-3xl">
      <p className="kicker">{kicker}</p>
      <Heading id={id} className="h2">
        {title}
      </Heading>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
