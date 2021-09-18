import { Handler, HandlerResponse } from "@netlify/functions"
import fetch from "node-fetch"
import ms from "ms"
import cookie from "cookie"

export const SPOTIFY_SCOPES = [
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
]
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

const authorization = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64")

async function refreshToken(refresh: string) {
  const searchParams = new URLSearchParams({
    // response_type: "code",
    client_id: SPOTIFY_CLIENT_ID!,
    scope: SPOTIFY_SCOPES.join(" "),
    redirect_uri: redirectUri,
    grant_type: "refresh_token",
    refresh_token: refresh,
  })
  return await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${authorization}`,
    },
    body: searchParams.toString(),
  })
}

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://xetera.dev/.netlify/functions/spotify"
    : "http://localhost:8008/.netlify/functions/spotify"

function makeCookies(token: string, expired = false) {
  const cookieSettings = `Max-Age=${ms("31d") / 1000}; Path=/`
  if (expired) {
    return [
      `spotifyToken=${token}; ${cookieSettings}; Expires=${new Date(0).toUTCString()} HttpOnly`,
      `spotifyLoggedIn=false; ${cookieSettings};`
    ]
  }
  return [
    `spotifyToken=${token}; ${cookieSettings}; HttpOnly`,
    `spotifyLoggedIn=true; ${cookieSettings};`
  ]
}

function failAndClearCookies(reason: string) {
  const cookies = makeCookies("", true)
  // something has gone wrong, clear cookies
  return {
    statusCode: 401,
    body: JSON.stringify({ status: "error", reason }),
    multiValueHeaders: {
      "Set-Cookie": cookies
    }
  }
}

const handler: Handler = async (event, context) => {
  // this is probably not restful but whatever I'm too lazy to name a new file
  if (event.httpMethod === "PUT") {
    const token = cookie.parse(event.headers.cookie ?? "").spotifyToken
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ status: "error", reason: "needsLogin" }),
      }
    }

    if (!token) {
      return failAndClearCookies("invalidCookie")
    }


    console.log(token)
    const response: any = await refreshToken(token)
    const resultStr = await response.text()
    if (!response.ok) {
      console.log("Something went wrong refreshing a token")
      console.log(resultStr)
      // clearing the existing cookie so the user can re-authorize
      // sorry for the bad api
      return failAndClearCookies("refreshFailed")
    }
    const result = JSON.parse(resultStr)

    return {
      statusCode: 200,
      body: JSON.stringify({ token: result.access_token }),
    }
  } else if (event.httpMethod === "GET") {
    console.log(event.queryStringParameters)
    if (!event.queryStringParameters?.code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing code" }),
      }
    }
    if (!event.queryStringParameters?.state) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing state" }),
      }
    }
    console.log(event.queryStringParameters)
    const searchParams = new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID!,
      scope: SPOTIFY_SCOPES.join(" "),
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code: event.queryStringParameters.code,
    })
    console.log(searchParams)
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Basic ${authorization}`,
      },
      body: searchParams.toString(),
    }).then(r => r.json())

    const url = new URL(event.queryStringParameters.state)

    const cookies = makeCookies(response.refresh_token)
    return {
      statusCode: 302,
      multiValueHeaders: {
        "Set-Cookie": cookies,
        // I don't know if this is an open redirect vulnerability. I hope not
        Location: [`/${url.pathname}${url.search}`.replace(/\/\//g, "/")],
      } as HandlerResponse["multiValueHeaders"],
    }
  } else {
    return {
      statusCode: 405,
      headers: {
        Location: "/",
      },
    }
  }
}

export { handler }
