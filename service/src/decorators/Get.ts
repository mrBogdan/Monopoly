import { Methods } from '../http/Methods';
import { RequestMapping } from './RequestMapping';

function Get(path: string) {
  return RequestMapping(Methods.GET, path);
}
