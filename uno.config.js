import unocss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetTypography from "unocss/preset-typography";

/**
 * @param {string} label
 * @param {numb} sizes
 * @returns
 */
function createMapping(label, sizes) {
  return Object.fromEntries(
    sizes.map((size) => [size, `var(--${label}-${size})`])
  );
}

export default unocss({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        "pre>code": {
          "min-width": "max-content",
          display: "block",
          width: "100%",
        },
        "pre,code": {
          "word-break": "inherit",
          "white-space": "inherit",
        },
        "pre > code": {
          "word-break": "unset",
        },
        code: {
          "white-space": "pre-line",
          "word-break": "break-word",
          "line-height": "150%",
        },
        p: {
          "line-height": "200%",
        },
      },
    }),
  ],
  rules: [["text-wrap-balance", { "text-wrap": "balance" }]],
  theme: {
    fontFamily: {
      display: "var(--font-family-sans)",
      sans: "var(--font-family-sans)",
      serif: "var(--font-family-serif)",
    },
    colors: {
      highlight: "var(--highlight)",
      whatsappChatBackgroundOutgoing:
        "var(--whatsapp-chat-background-outgoing)",
      whatsappChatBackgroundIncoming:
        "var(--whatsapp-chat-background-incoming)",
      whatsappChatMeta: "var(--whatsapp-chat-meta)",
      whatsappChatText: "var(--whatsapp-chat-text)",
      whatsappChatNumber: "var(--whatsapp-chat-number)",
      brand: createMapping(
        "brand",
        [100, 200, 300, 400, 500, 600, 700, 800, 900]
      ),
      body: createMapping(
        "body",
        [100, 200, 300, 400, 500, 600, 700, 800, 900]
      ),
      text: createMapping(
        "text",
        [100, 200, 300, 400, 500, 600, 700, 800, 900]
      ),
      gap: createMapping("gap", [1, 2, 3, 4, 5]),
    },
  },
});
