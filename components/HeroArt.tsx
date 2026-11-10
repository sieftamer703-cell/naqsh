export default function HeroArt() {
  return (
    <svg viewBox="0 0 400 520" className="mx-auto h-full w-full max-w-[420px]" aria-hidden>
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8cc8c" />
          <stop offset="1" stopColor="#a77a2c" />
        </linearGradient>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e231c" />
          <stop offset="1" stopColor="#14100d" />
        </linearGradient>
      </defs>
      <path d="M10 515V205a190 190 0 0 1 380 0v310Z" fill="url(#bg)" stroke="url(#gold)" strokeWidth="3" />
      <path d="M28 515V205a172 172 0 0 1 344 0v310Z" fill="none" stroke="url(#gold)" strokeWidth="1" opacity="0.6" />
      <g className="slow-spin" style={{ transformOrigin: "200px 225px" }} fill="none" stroke="url(#gold)">
        <rect x="120" y="145" width="160" height="160" strokeWidth="1.6" />
        <rect x="120" y="145" width="160" height="160" strokeWidth="1.6" transform="rotate(45 200 225)" />
        <rect x="150" y="175" width="100" height="100" strokeWidth="1" transform="rotate(22.5 200 225)" opacity="0.7" />
        <rect x="150" y="175" width="100" height="100" strokeWidth="1" transform="rotate(67.5 200 225)" opacity="0.7" />
      </g>
      <circle cx="200" cy="225" r="26" fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      <circle cx="200" cy="225" r="10" fill="url(#gold)" />
      <g fill="none" stroke="url(#gold)" strokeWidth="1.5">
        <rect x="62" y="400" width="70" height="90" rx="2" />
        <rect x="70" y="408" width="54" height="74" rx="1" opacity="0.5" />
        <rect x="165" y="385" width="70" height="105" rx="2" />
        <rect x="173" y="393" width="54" height="89" rx="1" opacity="0.5" />
        <rect x="268" y="410" width="70" height="80" rx="2" />
        <rect x="276" y="418" width="54" height="64" rx="1" opacity="0.5" />
      </g>
    </svg>
  );
}
