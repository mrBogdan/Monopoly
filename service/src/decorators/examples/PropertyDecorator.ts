// npm run build && node ./build/decorators/examples/PropertyDecorator.js

import "reflect-metadata";
import assert from 'node:assert';

const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: object, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    const formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}

void function ShouldFormatClassProperty() {
  const greeter = new Greeter("world");
  assert.equal(greeter.greet(), "Hello, world");
}();
