/*
  NAQSH | نقش — Official Links
  عدّل الروابط من هنا فقط. اترك القيمة فارغة "" إذا لم يتوفر الرابط.
*/
const links = {
  instagram: "https://www.instagram.com/naqsh2027/",
  facebook: "https://www.facebook.com/share/1ACZc84PQD/",
  whatsapp: "https://wa.me/201021199543",
  tiktok: "https://www.tiktok.com/@naqsh826",

  // أضف رابط Vodafone Cash هنا عند توفره:
  vodafoneCash: "",

  // رابط InstaPay الرسمي:
  instaPay: "https://ipn.eg/S/naqsh2027/instapay/34pgm3"
};

const icons = {
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h4V4h-4a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h4l1-4h-5V9a1 1 0 0 1 1-1Z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 9c.5 2 2 3.5 4 4l1-1 2 1c-.5 1.5-1.5 2-3 1.5-3-1-5-3-6-6-.5-1.5 0-2.5 1.5-3l1 2-1 1.5Z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11a4 4 0 1 1-4-4"/><path d="M14 3c.5 3 2.5 5 5 5"/></svg>`,
  vodafone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 8A7.5 7.5 0 1 0 20 13"/><path d="M15 4c3 0 5 2 5 5-3 0-5-2-5-5Z"/></svg>`,
  instapay: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/><path d="M5 6v12"/></svg>`
};

const socialItems = [
  { key: "instagram", label: "Instagram", icon: icons.instagram },
  { key: "facebook", label: "Facebook", icon: icons.facebook },
  { key: "whatsapp", label: "WhatsApp", icon: icons.whatsapp },
  { key: "tiktok", label: "TikTok", icon: icons.tiktok }
];

const paymentItems = [
  { key: "vodafoneCash", label: "Vodafone Cash", icon: icons.vodafone, className: "vodafone" },
  { key: "instaPay", label: "InstaPay", icon: icons.instapay, className: "instapay" }
];

function createLinkCard(item, isPayment = false) {
  const url = links[item.key];
  // لا يتم إنشاء زر غير فعّال إذا كان الرابط غير مضاف.
  if (!url) return null;

  const anchor = document.createElement("a");
  anchor.className = `link-card${isPayment ? ` payment-card ${item.className}` : ""}`;
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.setAttribute("aria-label", `فتح ${item.label}`);
  anchor.innerHTML = `
    <span class="symbol">${item.icon}</span>
    <span>${item.label}</span>
    <span class="arrow" aria-hidden="true">←</span>
  `;
  return anchor;
}

function renderLinks(items, containerId, isPayment = false) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
    const card = createLinkCard(item, isPayment);
    if (card) container.appendChild(card);
  });
}

renderLinks(socialItems, "social-links");
renderLinks(paymentItems, "payment-links", true);

const paymentNote = document.getElementById("payment-note");
paymentNote.hidden = Boolean(links.vodafoneCash || links.instaPay);
