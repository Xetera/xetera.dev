import { parse } from "cookie";
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const COOKIE_KEY = "theme";
const DARK_MODE_VALUE = "dark";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const res = await fetch(request);
		const contentType = res.headers.get("content-type");

		if (!contentType?.startsWith("text/html")) {
			return res;
		}
		const cookie = request.headers.get("Cookie");
		if (!cookie) {
			return res;
		}
		const theme = parse(cookie)[COOKIE_KEY];

		if (!theme) {
			return res;
		}
		return new HTMLRewriter().on("html", new HTMLHandler(theme)).transform(res);
	},
} satisfies ExportedHandler<Env>;

class HTMLHandler implements HTMLRewriterElementContentHandlers {
	theme: string;
	constructor(theme: string) {
		this.theme = theme;
	}
	element(el: Element) {
		if (this.theme === DARK_MODE_VALUE) {
			el.setAttribute("class", "dark");
		}
	}
}
