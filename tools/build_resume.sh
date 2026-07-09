#!/usr/bin/env bash
# Compile the LaTeX résumé to a PDF that the site serves for download.
# Runs locally (MiKTeX) and in CI (TeX Live). Output: assets/Aftab-Mulani-Resume.pdf
set -euo pipefail

SRC="Aftab_Mulani_ATS_Cloud_Resume.tex"
OUT_DIR="assets"
OUT_PDF="$OUT_DIR/Aftab-Mulani-Resume.pdf"
TMP="build-resume"

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "pdflatex not found — skipping résumé build (PDF left as-is)."
  exit 0
fi

mkdir -p "$TMP"
echo "Compiling $SRC ..."
# Two passes for stable layout/links
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$TMP" "$SRC" >"$TMP/pass1.log" 2>&1
pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$TMP" "$SRC" >"$TMP/pass2.log" 2>&1

GEN="$TMP/${SRC%.tex}.pdf"
if [[ ! -f "$GEN" ]]; then
  echo "ERROR: résumé PDF was not produced. Tail of log:"
  tail -30 "$TMP/pass2.log" || true
  exit 1
fi

mkdir -p "$OUT_DIR"
cp "$GEN" "$OUT_PDF"
rm -rf "$TMP"
echo "Résumé PDF written to $OUT_PDF"
