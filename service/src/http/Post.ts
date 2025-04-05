import { RequestMapping } from './RequestMapping';
import { Methods } from './Methods';

export function Post(path?: string) {
  return RequestMapping(path, Methods.POST);
}
