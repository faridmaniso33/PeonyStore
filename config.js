// config.js
window.CONFIG = {
  // Store Details
  storeName: "Rains", // Full Store Name
  shortStoreName: "Rains",
  whatsappNumber: "6283865477000", // Format: 62xxxxxxxxxx (no + or spaces)
  telegramUsername: "-",
  telegramLink: "",
  websiteUrl: "",
  emailAdmin: "",
  workHours: "08:00 – 23:00 WITA",
  location: "Indonesia",
  qrisImagePath: "qris.png", // Path or URL to QRIS payment image

  // Google Sheets Config (for index.html)
  sheetIdProducts: "1bdnXrwr84blKbZVQR0LRS0gDrQ2Arh8v-MmLAJK4Y84",
  sheetNameProducts: "Produk",
  sheetNameInfo: "informasi_modal",
  sheetNameTnc: "tnc", // Tab untuk Terms & Conditions (Kolom A: judul, Kolom B: deskripsi)

  // Theme Config
  // Options: "peony" (default), "green", "blue", "purple", "orange", "red", "custom"
  activeTheme: "peony",

  // Custom Theme Colors (Only used if activeTheme is set to "custom")
  customTheme: {
    primary: "#CB96BA",       // Mauve Dust
    primaryHover: "#B881A6",  // Mauve Dust Hover
    primaryLight: "#F0E2EB",  // Venus Flower Tint
    secondary: "#B0B3D6",     // Bluebell Frost
    accent: "#D0DDC4"         // Green Beryl
  }
};

// Apply theme dynamically as early as possible
applyDynamicTheme();

// Automatic replacement on page load
document.addEventListener("DOMContentLoaded", () => {
  applyDynamicBranding();
});

function applyDynamicTheme() {
  const cfg = window.CONFIG;
  if (!cfg) return;

  const themes = {
    peony: {
      primary: "#CB96BA",
      primaryHover: "#B881A6",
      primaryLight: "#F0E2EB",
      secondary: "#B0B3D6",
      accent: "#D0DDC4"
    },
    green: {
      primary: "#00AA5B",
      primaryHover: "#03ac0e",
      primaryLight: "#e8f8f0",
      secondary: "#00c853",
      accent: "#ff5722"
    },
    blue: {
      primary: "#0084FF",
      primaryHover: "#006fe6",
      primaryLight: "#e6f7ff",
      secondary: "#00b8ff",
      accent: "#ff4d4f"
    },
    purple: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      primaryLight: "#f5f3ff",
      secondary: "#a855f7",
      accent: "#10b981"
    },
    orange: {
      primary: "#ff5722",
      primaryHover: "#f4511e",
      primaryLight: "#fff3e0",
      secondary: "#ff9800",
      accent: "#29b6f6"
    },
    red: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      primaryLight: "#fff1f2",
      secondary: "#f43f5e",
      accent: "#eab308"
    }
  };

  let activeThemeColors = themes[cfg.activeTheme || "green"];

  // Fallback to custom theme if selected
  if (cfg.activeTheme === "custom" && cfg.customTheme) {
    activeThemeColors = {
      primary: cfg.customTheme.primary || "#00AA5B",
      primaryHover: cfg.customTheme.primaryHover || "#03ac0e",
      primaryLight: cfg.customTheme.primaryLight || "#e8f8f0",
      secondary: cfg.customTheme.secondary || cfg.customTheme.accent || "#00c853",
      accent: cfg.customTheme.accent || "#ff5722"
    };
  }

  if (activeThemeColors) {
    const secondaryColor = activeThemeColors.secondary || activeThemeColors.accent || activeThemeColors.primary;
    const css = `
      :root {
        --primary-color: ${activeThemeColors.primary} !important;
        --primary-color-hover: ${activeThemeColors.primaryHover} !important;
        --primary-light: ${activeThemeColors.primaryLight} !important;
        --secondary-color: ${secondaryColor} !important;
        --accent-color: ${activeThemeColors.accent} !important;
        --accent: ${activeThemeColors.primary} !important;
        --accent-2: ${secondaryColor} !important;
        --success-color: ${activeThemeColors.primary} !important;
        --gradient-primary: linear-gradient(135deg, ${activeThemeColors.primary} 0%, ${secondaryColor} 100%) !important;
        --gradient-accent: linear-gradient(135deg, ${activeThemeColors.accent} 0%, ${activeThemeColors.primary} 100%) !important;
        --bs-primary: ${activeThemeColors.primary} !important;
        --bs-primary-rgb: ${hexToRgb(activeThemeColors.primary)} !important;
        --bs-success: ${activeThemeColors.primary} !important;
        --bs-success-rgb: ${hexToRgb(activeThemeColors.primary)} !important;
      }

      .btn-primary,
      .btn-success {
        --bs-btn-bg: ${activeThemeColors.primary} !important;
        --bs-btn-border-color: ${activeThemeColors.primary} !important;
        --bs-btn-hover-bg: ${activeThemeColors.primaryHover} !important;
        --bs-btn-hover-border-color: ${activeThemeColors.primaryHover} !important;
        --bs-btn-active-bg: ${activeThemeColors.primaryHover} !important;
        --bs-btn-active-border-color: ${activeThemeColors.primaryHover} !important;
      }

      .btn-outline-primary {
        --bs-btn-color: ${activeThemeColors.primary} !important;
        --bs-btn-border-color: ${activeThemeColors.primary} !important;
        --bs-btn-hover-bg: ${activeThemeColors.primary} !important;
        --bs-btn-hover-border-color: ${activeThemeColors.primary} !important;
      }

      .text-success,
      .text-primary {
        color: ${activeThemeColors.primary} !important;
      }

      .bg-success,
      .bg-primary {
        background-color: ${activeThemeColors.primary} !important;
      }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = "dynamic-theme-style";
    styleEl.innerHTML = css;
    if (document.head) {
      document.head.appendChild(styleEl);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        document.head.appendChild(styleEl);
      });
    }
  }
}

function hexToRgb(hex) {
  const normalized = String(hex || "").replace("#", "").trim();
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return "0, 170, 91";
  const value = parseInt(normalized, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function applyDynamicBranding() {
  const cfg = window.CONFIG;
  if (!cfg) return;

  // 1. Update Document Title
  if (cfg.storeName) {
    document.title = `${cfg.storeName} — Premium Apps`;
  }

  // 2. Direct Header Brand Element Updates
  const brandTitleEl = document.querySelector('.header-title');
  if (brandTitleEl && cfg.storeName) {
    let name = cfg.storeName.trim();
    let parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      parts = name.split(/(?<=[a-z])(?=[A-Z])/).filter(Boolean);
    }
    if (parts.length >= 2) {
      const last = parts.pop();
      brandTitleEl.innerHTML = `${parts.join(' ')} <em>${last}</em>`;
    } else {
      brandTitleEl.innerHTML = `${name} <em>Store</em>`;
    }
  }

  const brandRightEl = document.querySelector('.header-right-text');
  if (brandRightEl && cfg.storeName) {
    const year = new Date().getFullYear();
    brandRightEl.textContent = `${cfg.storeName} · Premium Apps · ${year}`;
  }

  const brandSubEl = document.querySelector('.header-subtitle');
  if (brandSubEl && cfg.storeName) {
    brandSubEl.innerHTML = `⊹ &nbsp;♡ྀི &nbsp;<b>${cfg.storeName}</b>⠀𓉳 &nbsp;❤️︎ &nbsp;⊹ ⎯⎯⎯ &nbsp;🎀🪞 laman terpercaya dengan aplikasi premium berkualitas 🕯️🌸 ⊹ ⊹ menyajikan pelayanan bintang lima ✿ ⊹ ⁺ 𝜗ৎ &nbsp;𓌔𓌔𓌔 &nbsp;˖˚ welcome to ethereal page! ♡⠀𝜗ৎ⠀⊹`;
  }

  // 3. Safe Text Nodes Traversal & Replacement
  const searchRegName = /Putra Btt Store|Rain Store|HuraaFashion|Huraa Fashion|𝑹𝒂𝒊𝒏 𝑺𝒕𝒐𝒓𝒆/gi;
  const searchRegShort = /\bPBS\b/g;
  const searchRegWa = /6282340915319|6283865477000/g;
  const searchRegTele = /AutoOrderPBS_bot/gi;
  const searchRegWeb = /putrabttstore\.web\.id/gi;
  const searchRegEmail = /admin@putrabttstore\.web\.id/gi;

  function walkTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let val = node.nodeValue;
      if (val) {
        let changed = false;
        if (val.match(searchRegName)) {
          val = val.replace(searchRegName, cfg.storeName);
          changed = true;
        }
        if (val.match(searchRegShort)) {
          val = val.replace(searchRegShort, cfg.shortStoreName);
          changed = true;
        }
        if (val.match(searchRegWa)) {
          val = val.replace(searchRegWa, cfg.whatsappNumber);
          changed = true;
        }
        if (val.match(searchRegTele)) {
          val = val.replace(searchRegTele, cfg.telegramUsername);
          changed = true;
        }
        if (val.match(searchRegWeb)) {
          val = val.replace(searchRegWeb, cfg.websiteUrl.replace(/^https?:\/\//i, ''));
          changed = true;
        }
        if (val.match(searchRegEmail)) {
          val = val.replace(searchRegEmail, cfg.emailAdmin);
          changed = true;
        }
        if (changed) {
          node.nodeValue = val;
        }
      }
    } else if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      for (let i = 0; i < node.childNodes.length; i++) {
        walkTextNodes(node.childNodes[i]);
      }
    }
  }

  if (document.body) {
    walkTextNodes(document.body);
  }

  // 3. Update Anchor Hrefs
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    let href = link.getAttribute('href');
    if (href) {
      href = href.replace(/6282340915319/g, cfg.whatsappNumber);
      href = href.replace(/AutoOrderPBS_bot/g, cfg.telegramUsername);
      href = href.replace(/putrabttstore\.web\.id/g, cfg.websiteUrl.replace(/^https?:\/\//i, ''));
      href = href.replace(/admin@putrabttstore\.web\.id/g, cfg.emailAdmin);

      // Handle WhatsApp URL scheme formatting
      if (href.startsWith('https://wa.me/')) {
        try {
          const urlObj = new URL(href);
          const textParam = urlObj.searchParams.get('text');
          if (textParam) {
            urlObj.searchParams.set('text', textParam.replace(/Putra Btt Store/gi, cfg.storeName).replace(/\bPBS\b/g, cfg.shortStoreName));
          }
          href = urlObj.toString();
        } catch (e) {
          // Fallback if URL parsing fails for any reason
          href = href.replace(/Putra Btt Store/gi, cfg.storeName).replace(/\bPBS\b/g, cfg.shortStoreName);
        }
      } else if (href.startsWith('https://t.me/')) {
        href = cfg.telegramLink;
      } else if (href.includes('putrabttstore.web.id')) {
        href = cfg.websiteUrl;
      }

      link.setAttribute('href', href);
    }
  });

  // 4. Update elements with data-copy attributes
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    let val = btn.getAttribute('data-copy');
    if (val) {
      val = val.replace(/6282340915319/g, cfg.whatsappNumber);
      btn.setAttribute('data-copy', val);
    }
  });

  // 5. Update QRIS images & T&C Buttons
  const qrisImages = document.querySelectorAll('img[src="qris.png"], img[alt*="QRIS"]');
  qrisImages.forEach(img => {
    img.src = cfg.qrisImagePath;
  });

  const tncWaBtn = document.getElementById('tncWaBtn');
  if (tncWaBtn && cfg.whatsappNumber) {
    tncWaBtn.href = `https://wa.me/${cfg.whatsappNumber}`;
  }

  const tncTeleBtn = document.getElementById('tncTeleBtn');
  if (tncTeleBtn && (cfg.telegramLink || cfg.telegramUsername)) {
    tncTeleBtn.href = cfg.telegramLink || `https://t.me/${cfg.telegramUsername}`;
  }
}
