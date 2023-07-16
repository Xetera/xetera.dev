const MagicImageBytes = {
  640: 0b1011001001110011n,
  300: 0b0001111000000010n,
  64: 0b0100100001010001n,
} as const;

/**
 * Converts a spotify link to a new size.
 *
 * @see
 * Spotify stores links to album art in hexadecimal that when broken into
 * bytes leaves bytes 7-8 responsible for size. Instead of storing all
 * alternate sizes, we convert them when needed with this cursed function
 *
 * hex: ab67616d0000b2739d750d969d227e6506a2c176
 * bin: 10101011 01100111 01100001 01101101 00000000 00000000 10110010 01110011 10011101 ...
 *                                                            ^   640 x 640   ^
 *
 * hex: ab67616d00001e029d750d969d227e6506a2c176
 * bin: 10101011 01100111 01100001 01101101 00000000 00000000 00011110 00000010 10011101 ...
 *                                                            ^   300 x 300   ^
 * @param linkBase the hexadecimal path parameter of the url
 * @param size The size to convert to
 */
export function generateUrl(
  linkBase: string,
  size: keyof typeof MagicImageBytes,
): string {
  const mask = 0x000000000000ffff000000000000000000000000n;
  const value = BigInt(`0x${linkBase}`);
  const magic = MagicImageBytes[size];
  const newValue = magic << (12n * 8n);
  return ((value & ~mask) | (newValue & mask)).toString(16);
}

export function getUrlFromSpotify(url: string): string | undefined {
  return /https:\/\/i.scdn.co\/image\/(.*)/.exec(url)?.[1];
}

export function resizeSpotifyImageTo(
  url: string,
  size: keyof typeof MagicImageBytes,
) {
  const urlBase = getUrlFromSpotify(url);
  if (!urlBase) return url;
  return `https://i.scdn.co/image/${generateUrl(urlBase, size)}`;
}
