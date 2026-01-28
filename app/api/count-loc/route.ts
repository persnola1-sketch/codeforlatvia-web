import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const IGNORE = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cache: { linesOfCode: number; until: number } | null = null;

function countLinesInFile(filePath: string): number {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split(/\r?\n/).length;
  } catch {
    return 0;
  }
}

function countLoc(dir: string, root: string): number {
  let total = 0;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!IGNORE.has(e.name)) total += countLoc(full, root);
      } else if (EXTENSIONS.has(path.extname(e.name))) {
        total += countLinesInFile(full);
      }
    }
  } catch {
    // ignore
  }
  return total;
}

export async function GET() {
  const now = Date.now();
  if (cache && now < cache.until) {
    return NextResponse.json({ linesOfCode: cache.linesOfCode });
  }
  try {
    const root = process.cwd();
    const appDir = path.join(root, 'app');
    const libDir = path.join(root, 'lib');
    let lines = 0;
    if (fs.existsSync(appDir)) lines += countLoc(appDir, root);
    if (fs.existsSync(libDir)) lines += countLoc(libDir, root);
    cache = { linesOfCode: lines, until: now + CACHE_TTL_MS };
    return NextResponse.json({ linesOfCode: lines });
  } catch (err) {
    console.error('count-loc error:', err);
    return NextResponse.json(
      { linesOfCode: 0, error: 'Failed to count lines' },
      { status: 500 }
    );
  }
}
