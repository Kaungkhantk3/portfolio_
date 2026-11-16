/** Terminal-style build log. Static here; typed out per line in step 5. */
export default function BuildLog({ lines }: { lines: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-line bg-bg p-4 font-mono text-[12px] leading-[1.9] text-muted">
      {lines.map((line) => (
        <span key={line} data-log-line className="block">
          {line.startsWith("$") ? <span className="text-ink">{line}</span> : line}
        </span>
      ))}
    </pre>
  );
}
