import {IdGenerator} from "../../idGenerator/IdGenerator";

describe('IdGenerator', () => {
  let idGenerator: IdGenerator;

  beforeEach(() => {
    idGenerator = new IdGenerator();
  });

  test('generateUUID should return a valid UUID', () => {
    const uuid = idGenerator.generateUUID();
    expect(uuid).toBeDefined();
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidPattern);
  });

  test('generateUUID should return unique values', () => {
    const uuid1 = idGenerator.generateUUID();
    const uuid2 = idGenerator.generateUUID();
    expect(uuid1).not.toBe(uuid2);
  });
});