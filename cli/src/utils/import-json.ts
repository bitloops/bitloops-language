import fs from 'fs';
export const loadJSON = <T = any>(path): T =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)) as any) as T;
