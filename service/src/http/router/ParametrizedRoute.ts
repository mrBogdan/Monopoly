export interface ParametrizedRoute {
  paramName(): string;

  paramValue(): string;

  setParamValue(value: string): void;
}
