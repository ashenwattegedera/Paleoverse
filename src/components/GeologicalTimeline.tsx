const mesozoicPeriods = [
  { name: 'Triassic', dates: '252–201 Ma' },
  { name: 'Jurassic', dates: '201–145 Ma' },
  { name: 'Cretaceous', dates: '145–66 Ma' },
];

/** A contextual display range, not an additional claim about a taxon's fossil dates. */
export function GeologicalTimeline({
  name,
  period,
  ageRangeMa,
}: {
  name: string;
  period: string;
  ageRangeMa: [number, number];
}) {
  const [oldest, youngest] = ageRangeMa;
  const withinMesozoic = oldest <= 252 && youngest >= 66;
  const start = withinMesozoic ? 252 : Math.ceil(oldest + Math.max(1, (oldest - youngest) * 0.25));
  const end = withinMesozoic
    ? 66
    : Math.max(0, Math.floor(youngest - Math.max(1, (oldest - youngest) * 0.25)));
  const span = start - end;
  const left = ((start - oldest) / span) * 100;
  const width = ((oldest - youngest) / span) * 100;

  return (
    <figure
      className="timeline-panel"
      aria-label={`${name}: ${oldest} to ${youngest} million years ago`}
    >
      <div className="timeline-panel-head">
        <span>{withinMesozoic ? 'MESOZOIC CONTEXT' : 'GEOLOGICAL CONTEXT'}</span>
        <small>
          {start}–{end} MILLION YEARS AGO
        </small>
      </div>
      {withinMesozoic && (
        <div className="period-blocks">
          {mesozoicPeriods.map(({ name: periodName, dates }) => (
            <div
              key={periodName}
              className={
                period.toLowerCase().includes(periodName.toLowerCase()) ? 'period-active' : ''
              }
            >
              <span>{periodName.toUpperCase()}</span>
              <b>{dates}</b>
            </div>
          ))}
        </div>
      )}
      <div className="timeline-track" aria-hidden="true">
        <div className="timeline-progress" style={{ left: `${left}%`, width: `${width}%` }} />
      </div>
      <div className="timeline-axis">
        <span>{start} Ma</span>
        <span>{end} Ma</span>
      </div>
      <figcaption className="timeline-current">
        <span>RECORDED INTERVAL</span>
        <b>
          {oldest}–{youngest} Ma / {period.toUpperCase()}
        </b>
        <span>Approximate geological range. Ma means millions of years ago.</span>
      </figcaption>
    </figure>
  );
}
