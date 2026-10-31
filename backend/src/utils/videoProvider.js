import crypto from "crypto";
import { env } from "../config/env.js";

/**
 * Protected Video Playback Authorization (Mux / Bunny Stream)
 */
export function generatePlaybackAuthorization({ videoProvider, videoAssetId, userId, courseId }) {
  const expiresAt = Math.floor(Date.now() / 1000) + 3600 * 4; // 4-hour playback token

  if (videoProvider === "BUNNY") {
    // Bunny Stream Token Authentication (SHA256 hash token)
    const securityKey = env.BUNNY_STREAM_API_KEY || "mock_bunny_secret";
    const path = `/${videoAssetId}`;
    const hashableBase = `${securityKey}${path}${expiresAt}`;
    const token = crypto.createHash("sha256").update(hashableBase).digest("hex");

    return {
      provider: "BUNNY",
      videoId: videoAssetId,
      playbackUrl: `https://video.bunnycdn.com/play/${env.BUNNY_STREAM_LIBRARY_ID}/${videoAssetId}?token=${token}&expires=${expiresAt}`,
      expiresAt,
    };
  }

  // Default: Mux Signed Playback Token
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const claims = Buffer.from(
    JSON.stringify({
      sub: videoAssetId,
      aud: "v",
      exp: expiresAt,
      kid: env.MUX_TOKEN_ID || "mux_key_id",
      userId,
      courseId,
    })
  ).toString("base64url");

  const secret = env.MUX_TOKEN_SECRET || "mux_token_secret";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${claims}`)
    .digest("base64url");

  const jwt = `${header}.${claims}.${signature}`;

  return {
    provider: "MUX",
    playbackId: videoAssetId,
    playbackUrl: `https://stream.mux.com/${videoAssetId}.m3u8?token=${jwt}`,
    jwtToken: jwt,
    expiresAt,
  };
}

