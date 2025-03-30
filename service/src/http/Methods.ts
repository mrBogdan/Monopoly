export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  HEAD = 'HEAD',
  NONE = 'NONE',
  ANY = 'ANY',
}

export const methodsWithBody = () => [Methods.POST, Methods.PUT, Methods.OPTIONS, Methods.TRACE, Methods.HEAD];

export const isMethodWithBody = (method: Methods) => methodsWithBody().includes(method);
