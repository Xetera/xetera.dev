import unocss from "unocss/astro"
import presetUno from "unocss/preset-uno"
import presetTypography from "unocss/preset-typography"

function createMapping(label, sizes) {
	return Object.fromEntries(
		sizes.map(size => [size, `var(--${label}-${size})`])
	)
}

export default unocss({
	presets: [
		presetUno(),
		presetTypography({
			cssExtend: {
				code: {
					"line-height": "150%",
				},
				p: {
					"line-height": "200%",
				},
			},
		}),
	],
	theme: {
		fontFamily: {
			display: "var(--font-family-sans)",
			sans: "var(--font-family-sans)",
			serif: "var(--font-family-serif)",
		},
		colors: {
			highlight: "var(--highlight)",
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
})
