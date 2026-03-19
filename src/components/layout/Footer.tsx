export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-black/20 px-6 py-8 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-[13px] text-white/30">
          © 2026 Kaung Khant Kyaw. All rights reserved.
        </p>
        <p className="text-[13px] text-white/25">
          Built with React · TypeScript · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
