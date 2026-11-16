import { footer } from "../../data/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 font-mono text-[12px] text-muted sm:flex-row">
        <p>{footer.copyright}</p>
        <p>{footer.builtWith}</p>
      </div>
    </footer>
  );
}
