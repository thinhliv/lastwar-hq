/**
 * Universal YouTube URL/ID parser
 * Extracts the 11-character video ID from:
 * - https://youtu.be/tTURTqzi8nY
 * - https://www.youtube.com/watch?v=tTURTqzi8nY
 * - https://www.youtube.com/shorts/tTURTqzi8nY
 * - https://www.youtube.com/embed/tTURTqzi8nY
 * - https://m.youtube.com/watch?v=tTURTqzi8nY
 * - Raw 11-char ID (e.g. tTURTqzi8nY)
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();

  // Match standard youtu.be, watch?v=, shorts/, embed/, live/
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }

  // Already an 11-character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return trimmed;
}

export function getYouTubeEmbedUrl(urlOrId: string): string {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
}

export function getYouTubeWatchUrl(urlOrId: string): string {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}
