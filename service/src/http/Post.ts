import { Methods } from './Methods';
import { RequestMapping } from './RequestMapping';

export function Post(path?: string) {
  return RequestMapping(path, Methods.POST);
}
