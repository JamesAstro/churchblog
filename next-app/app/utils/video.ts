export function getVideoEmbedUrl(url: string) {
  if (!url) return "";

  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    if (url.includes("/embed/")) return url;
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    if (videoIdMatch?.[1])
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch?.[1])
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    const videoIdMatch = url.match(/vimeo\.com\/(\d+)/);
    if (videoIdMatch?.[1])
      return `https://player.vimeo.com/video/${videoIdMatch[1]}`;
  }

  // Google Drive
  if (url.includes("drive.google.com")) {
    const match = url.match(/file\/d\/([^/]+)/);
    if (match?.[1])
      return `https://drive.google.com/file/d/${match[1]}/preview`;
  }

  // OneDrive (basic embed detection, may require authors to generate embed link)
  if (url.includes("onedrive.live.com")) return url;

  // Facebook
  if (url.includes("facebook.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}&show_text=0&width=400`;
  }

  // fallback: return original URL (assume HTML5 <video> compatible)
  return url;
}
