import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

export function gitExecutable() {
  const native = path.join(process.env.ProgramFiles ?? 'C:\\Program Files', 'Git', 'cmd', 'git.exe');
  return process.platform === 'win32' && existsSync(native) ? native : 'git';
}
export function git(root, args) {
  return execFileSync(gitExecutable(), ['-C', root, ...args], { encoding: 'utf8', windowsHide: true, timeout: 30000 }).trim();
}
export function gitEnvironment() {
  const env = { ...process.env };
  if (process.platform === 'win32') env.PATH = `${path.dirname(gitExecutable())};${env.PATH ?? ''}`;
  return env;
}
