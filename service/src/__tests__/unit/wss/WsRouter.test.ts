import 'reflect-metadata';

import { Hub, Subscribe, WsRouter } from '../../../wss';

describe('WsRouter', () => {
  describe('Should return hub and method', () => {
    @Hub('foo')
    class Foo {
      @Subscribe('bar')
      public event() {
        return 'event';
      }
    }

    let router: WsRouter;

    beforeAll(() => {
      router = new WsRouter();
    });

    it('should find hub and event', () => {
      const { hub, method } = router.findHub('foo:bar');
      expect(hub).toBe(Foo);
      expect(method).toBe('event');
    });
  });
});
