#!/usr/bin/env bash
#
# Install a real photo as the Founder & CEO portrait.
#
# The site always reads the founder photo from:
#     frontend/public/images/team-founder.jpg
# so replacing that file (via this script or manually) updates the About page
# leadership section and every avatar that falls back to the founder.
#
# Usage:
#   ./scripts/set-founder-photo.sh ~/Downloads/raja.png
#   ./scripts/set-founder-photo.sh ~/Downloads/raja.png 640 north
#   ./scripts/set-founder-photo.sh https://example.com/photo.jpg
#
# Args:
#   $1  source image path or URL (required)
#   $2  output size in px, square (default: 640)
#   $3  crop gravity: north | center | south | face (default: north)
#       "north" keeps the top of the frame, which is where faces usually sit
#       and avoids bottom-corner watermarks/logos on generated images.
#
# Requires ImageMagick (`magick` or `convert`):
#   macOS:  brew install imagemagick
#   Debian: sudo apt-get install imagemagick

set -euo pipefail

SOURCE="${1:-}"
SIZE="${2:-640}"
GRAVITY="${3:-north}"

if [[ -z "$SOURCE" ]]; then
  echo "error: pass a source image path or URL" >&2
  echo "usage: $0 <image-path-or-url> [size=640] [gravity=north]" >&2
  exit 1
fi

if command -v magick >/dev/null 2>&1; then
  IM=(magick)
elif command -v convert >/dev/null 2>&1; then
  IM=(convert)
else
  echo "error: ImageMagick not found (install 'magick' or 'convert')" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
TARGET="$FRONTEND_DIR/public/images/team-founder.jpg"
mkdir -p "$(dirname "$TARGET")"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

INPUT="$SOURCE"
if [[ "$SOURCE" =~ ^https?:// ]]; then
  INPUT="$WORK/source"
  echo "→ downloading $SOURCE"
  curl -fsSL "$SOURCE" -o "$INPUT"
fi

if [[ ! -f "$INPUT" ]]; then
  echo "error: file not found: $INPUT" >&2
  exit 1
fi

echo "→ cropping to ${SIZE}x${SIZE} (gravity: $GRAVITY) and optimising"
"${IM[@]}" "$INPUT" \
  -auto-orient \
  -resize "${SIZE}x${SIZE}^" \
  -gravity "$GRAVITY" \
  -extent "${SIZE}x${SIZE}" \
  -strip -interlace Plane -quality 84 \
  "$TARGET"

BYTES=$(wc -c < "$TARGET" | tr -d ' ')
echo "✓ wrote $TARGET (${BYTES} bytes)"
echo
echo "Next:"
echo "  · cd frontend && npm run dev   (hot reload picks it up)"
echo "  · re-run the backend seed if you want the API to serve the same file:"
echo "      cd backend && .venv/bin/python seed_data.py"
