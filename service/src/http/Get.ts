import { RequestMapping } from './RequestMapping';

export function Get(path?: string) {
  return RequestMapping(path);
}
