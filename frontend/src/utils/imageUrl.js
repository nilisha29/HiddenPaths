// Backend serves uploaded files from /uploads; API base is .../api, so we
// strip the /api suffix to get the server origin for building image URLs.
const SERVER_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  "/api",
  ""
);

export const resolveImage = (path, fallback = "") => {
  if (!path) return fallback;
  return path.startsWith("http") ? path : `${SERVER_ORIGIN}${path}`;
};

export default resolveImage;
