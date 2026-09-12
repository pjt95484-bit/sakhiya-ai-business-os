import { SectionHeading } from "./SectionHeading";

type NodeDef = { id: string; label: string; sub?: string; accent?: boolean };

const NODES: NodeDef[] = [
  { id: "source", label: "Instagram ad / Website" },
  { id: "assistant", label: "AI Assistant", sub: "ElevenLabs, 24/7", accent: true },
  { id: "n8n", label: "n8n backbone", accent: true },
  { id: "lead", label: "Lead Agent" },
  { id: "followup", label: "Follow-up Agent" },
  { id: "ad", label: "Ad Creative Agent" },
  { id: "booking", label: "Booking Engine", accent: true },
  { id: "alert", label: "Slack / Email alert" },
  { id: "repeat", label: "Repeat visit" },
  { id: "approval", label: "Ads for approval" },
  { id: "dashboard", label: "Live dashboard", sub: "Coefficient + Google Sheets" },
];

const DESCRIPTIONS: Record<string, string> = {
  source:
    "Where patients come from. An Instagram ad or the website hands the visitor to the assistant instead of a DM inbox nobody checks at 11 PM.",
  assistant:
    "An ElevenLabs conversational agent that answers by voice or chat at any hour, in Gujarati, Hinglish or English. It collects name, phone, concern and preferred time, then calls n8n over a webhook. It holds slots; it never confirms them.",
  n8n: "The workflow backbone. Every enquiry, booking request, morning reminder run and weekly ad brief passes through n8n, which validates inputs in code before any agent or calendar is touched.",
  lead: "Reads the enquiry and the patient's own words. Gemini scores it 0–100 and detects language and script separately. Hot leads (70+) trigger an instant alert that names the language to call in.",
  followup:
    "Runs every morning Monday to Saturday, finds sessions due within three days, writes a reminder in the patient's own language and script, and writes status back so nobody is reminded twice.",
  ad: "Turns the weekly brief into a Surat-specific buyer persona, writes five ad variations, self-checks each against India healthcare ad rules and saves them as Awaiting Approval.",
  booking:
    "Holds a seat and returns a reference like SSC-BK-06485281. If the slot is full it returns up to three genuinely open alternatives from the live schedule. Slot and centre mapping happens in code, not in the prompt.",
  alert:
    "A Slack or email alert for Hot leads, stating who to call, in which language, and the hold reference.",
  repeat:
    "The reminder that brings a patient back for the next session, flagged needs_human_review where a person should read it first.",
  approval:
    "Five ad variations in a sheet, marked Awaiting Approval. Nothing is published until a human ticks it.",
  dashboard:
    "Google Sheets with a Coefficient dashboard on top: enquiry volume, language mix, Hot-lead count and hold references, live.",
};

type Pos = { x: number; y: number; w: number; h: number };
type Layout = {
  width: number;
  height: number;
  nodes: Record<string, Pos>;
  edges: string[];
  label: { x: number; y: number; text: string };
};

function wideLayout(): Layout {
  const w = 200;
  const h = 56;
  const cols = [30, 260, 490];
  const cx = cols.map((x) => x + w / 2);
  const rows = {
    source: 8,
    assistant: 104,
    n8n: 200,
    agents: 316,
    booking: 404,
    outputs: 508,
    dashboard: 612,
  };
  const nodes: Record<string, Pos> = {
    source: { x: cols[1], y: rows.source, w, h },
    assistant: { x: cols[1], y: rows.assistant, w, h },
    n8n: { x: cols[1], y: rows.n8n, w, h },
    lead: { x: cols[0], y: rows.agents, w, h },
    followup: { x: cols[1], y: rows.agents, w, h },
    ad: { x: cols[2], y: rows.agents, w, h },
    booking: { x: cols[0], y: rows.booking, w, h },
    alert: { x: cols[0], y: rows.outputs, w, h },
    repeat: { x: cols[1], y: rows.outputs, w, h },
    approval: { x: cols[2], y: rows.outputs, w, h },
    dashboard: { x: cols[1], y: rows.dashboard, w, h },
  };
  const edges = [
    `M${cx[1]} ${rows.source + h} V${rows.assistant}`,
    `M${cx[1]} ${rows.assistant + h} V${rows.n8n}`,
    `-M${cx[1]} ${rows.n8n + h} V290 M${cx[0]} 290 H${cx[2]}`,
    `M${cx[0]} 290 V${rows.agents}`,
    `M${cx[1]} 290 V${rows.agents}`,
    `M${cx[2]} 290 V${rows.agents}`,
    `M${cx[0]} ${rows.agents + h} V${rows.booking}`,
    `M${cx[0]} ${rows.booking + h} V${rows.outputs}`,
    `M${cx[1]} ${rows.agents + h} V${rows.outputs}`,
    `M${cx[2]} ${rows.agents + h} V${rows.outputs}`,
    `-M${cx[0]} ${rows.outputs + h} V588 M${cx[2]} ${rows.outputs + h} V588 M${cx[0]} 588 H${cx[2]}`,
    `M${cx[1]} ${rows.outputs + h} V${rows.dashboard}`,
  ];
  return {
    width: 720,
    height: 680,
    nodes,
    edges,
    label: { x: cx[1] + 10, y: 184, text: "webhook" },
  };
}

function narrowLayout(): Layout {
  const w = 236;
  const h = 56;
  const x = 50;
  const cx = x + w / 2;
  const railL = 22;
  const railR = 306;
  const y = {
    source: 8,
    assistant: 100,
    n8n: 192,
    lead: 300,
    booking: 392,
    alert: 484,
    followup: 592,
    repeat: 684,
    ad: 792,
    approval: 884,
    dashboard: 992,
  };
  const nodes: Record<string, Pos> = Object.fromEntries(
    Object.entries(y).map(([id, top]) => [id, { x, y: top, w, h }]),
  );
  const mid = (top: number) => top + h / 2;
  const edges = [
    `M${cx} ${y.source + h} V${y.assistant}`,
    `M${cx} ${y.assistant + h} V${y.n8n}`,
    `-M${cx} ${y.n8n + h} V270 H${railL} V${mid(y.ad)}`,
    `M${railL} ${mid(y.lead)} H${x}`,
    `M${railL} ${mid(y.followup)} H${x}`,
    `M${railL} ${mid(y.ad)} H${x}`,
    `M${cx} ${y.lead + h} V${y.booking}`,
    `M${cx} ${y.booking + h} V${y.alert}`,
    `M${cx} ${y.followup + h} V${y.repeat}`,
    `M${cx} ${y.ad + h} V${y.approval}`,
    `-M${x + w} ${mid(y.alert)} H${railR} V966 M${x + w} ${mid(y.repeat)} H${railR} M${x + w} ${mid(y.approval)} H${railR}`,
    `M${railR} 966 H${cx} V${y.dashboard}`,
  ];
  return { width: 330, height: 1060, nodes, edges, label: { x: cx + 10, y: 178, text: "webhook" } };
}

function Diagram({
  layout,
  className,
  titleId,
}: {
  layout: Layout;
  className?: string;
  titleId: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={className}
      aria-labelledby={titleId}
      role="group"
    >
      <title id={titleId}>
        System flow: patient source → AI assistant → n8n → three agents and the booking engine →
        alerts, reminders and ad approvals → live dashboard
      </title>
      <defs>
        <marker
          id={`${titleId}-arrow`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-copy-muted" />
        </marker>
      </defs>

      <g className="fill-none stroke-neon-dim" strokeWidth="1.5">
        {layout.edges.map((d, i) => {
          // Edges prefixed with "-" are bus/rail segments and carry no arrowhead.
          const arrow = !d.startsWith("-");
          return (
            <path
              key={i}
              d={d.replace(/^-/, "")}
              markerEnd={arrow ? `url(#${titleId}-arrow)` : undefined}
            />
          );
        })}
      </g>

      <text
        x={layout.label.x}
        y={layout.label.y}
        className="fill-copy-muted font-mono"
        fontSize="11"
      >
        {layout.label.text}
      </text>

      {NODES.map((n) => {
        const p = layout.nodes[n.id];
        const cx = p.x + p.w / 2;
        const cy = p.y + p.h / 2;
        // The link's accessible name comes from its <text> children, so it always
        // matches the visible label (WCAG 2.5.3 Label in Name).
        return (
          <a key={n.id} href={`#node-${n.id}`}>
            <g className="cursor-pointer [&>rect]:hover:stroke-neon [&>rect]:focus-visible:stroke-neon">
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx="10"
                className={n.accent ? "fill-raised stroke-neon" : "fill-surface stroke-neon-dim"}
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={n.sub ? cy - 4 : cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-copy font-sans"
                fontSize="14"
                fontWeight="500"
              >
                {n.label}
              </text>
              {n.sub ? (
                <text
                  x={cx}
                  y={cy + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-copy-muted font-sans"
                  fontSize="11.5"
                >
                  {n.sub}
                </text>
              ) : null}
            </g>
          </a>
        );
      })}
    </svg>
  );
}

export function Architecture() {
  const wide = wideLayout();
  const narrow = narrowLayout();

  return (
    <section id="system" aria-labelledby="system-title" className="section border-t border-edge">
      <div className="container-site">
        <SectionHeading
          kicker="03 — The system"
          id="system-title"
          title="One assistant in front, one n8n backbone behind, three agents and a booking engine in between."
          lede="Click any node to read what it does. The flow is top to bottom: a patient arrives from an ad or the website, the assistant talks to them, n8n takes over, and everything ends in a live dashboard."
        />

        <figure className="section-body rounded-xl border border-edge bg-base p-4 sm:p-8">
          <Diagram
            layout={wide}
            className="mx-auto hidden w-full max-w-[45rem] sm:block"
            titleId="arch-wide"
          />
          <Diagram
            layout={narrow}
            className="mx-auto w-full max-w-[21rem] sm:hidden"
            titleId="arch-narrow"
          />
          <figcaption className="mx-auto mt-6 max-w-prose text-center text-xs text-copy-muted">
            Green nodes are the ones that make decisions. Everything else records, alerts or waits
            for a human. Select a node to jump to its description.
          </figcaption>
        </figure>

        <dl className="mt-10 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {NODES.map((n) => (
            <div
              key={n.id}
              id={`node-${n.id}`}
              className="border-t border-edge py-4 target:border-neon"
            >
              <dt className="font-medium text-copy">
                {n.label}
                {n.sub ? (
                  <span className="ml-2 text-sm font-normal text-copy-muted">{n.sub}</span>
                ) : null}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-copy">{DESCRIPTIONS[n.id]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
