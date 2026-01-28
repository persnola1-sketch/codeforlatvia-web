#!/bin/bash
# Nightly static check scaffold
# Run from project root. Writes logs to Mia Space logs directory.

LOGDIR="C:\\Users\\User\\Documents\\Obsidian Vault\\Mia Space\\logs"
mkdir -p "$LOGDIR"
DATE=$(date +"%Y-%m-%d")
LOGFILE="$LOGDIR/nightly-$DATE.log"

echo "Starting nightly check: $(date)" > "$LOGFILE"

echo "Running TypeScript check..." >> "$LOGFILE"
# tsc --noEmit
npm run build --if-present >> "$LOGFILE" 2>&1 || echo "Build had errors" >> "$LOGFILE"

echo "Running lint..." >> "$LOGFILE"
npm run lint --if-present >> "$LOGFILE" 2>&1 || echo "Lint had issues" >> "$LOGFILE"

echo "Nightly check finished: $(date)" >> "$LOGFILE"

echo "Summary saved to $LOGFILE"
