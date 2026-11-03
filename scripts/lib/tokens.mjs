// Tokens visuais do perfil (direção "Sinal"). Fonte única: todo SVG sai daqui.
// Ao mudar uma cor, rode `npm run check`: ele recalcula o contraste WCAG de todos os pares de texto.

export const THEMES = {
  dark: {
    canvas: '#0d1117', // fundo do GitHub no tema escuro
    panel: '#0f161c',  // fundo dos painéis/cartões
    line: '#24323c',   // linhas, bordas e grade (decorativo)
    ink: '#e7eef2',    // texto principal
    muted: '#93a4b0',  // texto secundário
    accent: '#2dd4bf', // "sinal": acento frio
    warm: '#f2b33d',   // "destaque": acento quente, usado com parcimônia
  },
  light: {
    canvas: '#ffffff',
    panel: '#f4f8f8',
    line: '#cfdcdd',
    ink: '#10181d',
    muted: '#4f6069',
    accent: '#0a7469',
    warm: '#975700',
  },
};

// Tom único dos ícones de stack (um arquivo serve aos dois temas):
// precisa de 3:1 contra o fundo claro (#ffffff) e o escuro (#0d1117) do GitHub.
export const ICON_TINT = '#6f8791';

export const FONT = {
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace",
  // Títulos usam Geologica 600 convertida em contorno (scripts/lib/glyphs.mjs).
};

// Contraste WCAG 2.x
function luminance(hex) {
  const [r, g, b] = hex.replace('#', '').match(/../g).map(h => parseInt(h, 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
