import { Events } from '@storefront/core';
import Template from '../../src/template';
import suite from './_suite';

suite('Template', ({ expect, spy }) => {
  let template: Template;

  beforeEach(() => template = new Template());

  describe('init()', () => {
    it('should call expose()', () => {
      const expose = template.expose = spy();
      template.flux = <any>{ on: () => null };

      template.init();

      expect(expose.calledWith('template')).to.be.true;
    });

    it('should listen for TEMPLATE_UPDATED', () => {
      const on = spy();
      template.flux = <any>{ on };
      template.expose = () => null;

      template.init();

      expect(on.calledWith(Events.TEMPLATE_UPDATED, template.updateZones)).to.be.true;
    });
  });

  describe('updateZones()', () => {
    it('should set active state', () => {
      const target = 'banner';
      const rule = 'toy banner';
      const zones = { a: 'b' };
      const set = template.set = spy();
      template.props = { target };

      template.updateZones(<any>{ name: target, rule, zones });

      expect(set.calledWith({ zones, rule, isActive: true })).to.be.true;
    });

    it('should set inactive state', () => {
      const name = 'banner';
      const set = template.set = spy();
      template.state = <any>{ rule: 'toy banner' };
      template.props = { target: 'default' };

      template.updateZones(<any>{ name });

      expect(set.calledWith({ zones: {}, rule: undefined, isActive: false })).to.be.true;
    });

    it('should not call set()', () => {
      template.set = () => expect.fail();
      template.props = { target: 'top rated' };

      template.updateZones(<any>{ name: 'banner' });
    });
  });
});
