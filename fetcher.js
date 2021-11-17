import parser from "node-html-parser"
import fetch from "node-fetch"

const userAgent = "Gatsby worker (https://narigon.dev)"

/**
 * Forgive me lord for I have sinned in this function
 */

export async function getOsu() {
  // sorry peppy, it's kind of ridiculous that I can't access public
  // routes without an oauth token that has to constantly stay refreshed
  const response = await fetch("https://osu.ppy.sh/users/Pannari", {
    headers: { "User-Agent": userAgent },
  })

  const dom = parser(await response.text())
  const out = JSON.parse(dom.querySelector("#json-user").textContent)
  return out
}

export async function getAnilist() {
  const response = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query UserQuery {
          user: User(name: "Pannari") {
            statistics {
              anime {
                count
              }
            }
          }
        }
      `,
    }),
  })
  const { data } = await response.json()
  return data
}
