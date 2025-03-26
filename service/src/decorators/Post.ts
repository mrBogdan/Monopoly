import { RequestMapping } from './RequestMapping';
import { Methods } from '../http/Methods';

export function Post(path?: string) {
  return RequestMapping(path, Methods.POST);
}
