import unocss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetTypography from "unocss/preset-typography";
import kebabCase from "lodash/kebabCase.js";

function createMapping(label: string, sizes: number[]) {
	return Object.fromEntries(
		sizes.map((size) => [size, `var(--${label}-${size})`]),
	);
}

function variables(variables: string[]) {
	return Object.fromEntries(
		variables.map((a) => [a, `var(--${kebabCase(a)})`]),
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
					"line-height": "1.8",
				},
			},
		}),
	],
	rules: [["text-wrap-balance", { "text-wrap": "balance" }]],
	theme: {
		fontFamily: {
			display: "var(--font-family-sans)",
			sans: "var(--font-family-sans)",
			articleTitle: "var(--font-family-article-title)",
		},
		colors: {
			...variables([
				"highlight",
				// whatsapp
				"whatsappChatBackgroundOutgoing",
				"whatsappChatBackgroundIncoming",
				"whatsappChatMeta",
				"whatsappChatText",
				"whatsappChatNumber",
				// discord
				"discordBackground",
				"discordText",
				"discordReactionBackground",
				"discordReactionReactedBackground",
				"discordReactionReactedBorder",
				"discordEmbedBackground",
				"discordPrimary500",
			]),
			brand: createMapping(
				"brand",
				[100, 200, 300, 400, 500, 600, 700, 800, 900],
			),
			body: createMapping(
				"body",
				[100, 200, 300, 400, 500, 600, 700, 800, 900],
			),
			text: createMapping(
				"text",
				[100, 200, 300, 400, 500, 600, 700, 800, 900],
			),
			gap: createMapping("gap", [1, 2, 3, 4, 5]),
		},
	},
});
