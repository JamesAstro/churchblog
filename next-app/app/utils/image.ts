export function getGoogleDriveImageThumbnail(url: string) {
  const match = url.match(/file\/d\/([^/]+)/);
  if (match?.[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}`;
  }
  return url;
}
