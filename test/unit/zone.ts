import Zone from '../../src/zone';
import suite from './_suite';

class MockZone extends Zone { }

suite('Zone', ({ expect, spy }) => {
  let mockZone: MockZone;

  beforeEach(() => mockZone = new MockZone());

  describe('init()', () => {
    it('should expose props.zone', () => {
      const zone: any = { a: 'b' };
      const expose = mockZone.expose = spy();
      mockZone.props = { zone };

      mockZone.init();

      expect(expose).to.be.calledWith('zone', zone);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateAlias()', () => {
      const zone: any = { a: 'b' };
      const updateAlias = mockZone.updateAlias = spy();
      mockZone.props = { zone };

      mockZone.onUpdate();

      expect(updateAlias).to.be.calledWith('zone', zone);
    });
  });
});
