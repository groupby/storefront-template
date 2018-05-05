import { Events } from '@storefront/core';
import Template from '../../src/template';
import suite from './_suite';

suite('Template', ({ expect, spy, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let template: Template;

  beforeEach(() => template = new Template());

  itShouldBeConfigurable(Template);
  itShouldHaveAlias(Template, 'template');

  describe('constructor()', () => {
    describe('state', () => {
      it('should have initial value', () => {
        expect(template.state).to.eql({
          isActive: false,
          zones: {}
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for TEMPLATE_UPDATED if no $sayt alias', () => {
      const subscribe = template.subscribe = spy();

      template.init();

      expect(subscribe).to.be.calledOnce
        .and.calledWith(Events.TEMPLATE_UPDATED, template.updateZones);
    });

    it('should listen for AUTOCOMPLETE_TEMPLATE_UPDATED if $sayt alias found', () => {
      const subscribe = template.subscribe = spy();
      template.$sayt = true;

      template.init();

      expect(subscribe).to.be.calledOnce
        .and.calledWith(Events.AUTOCOMPLETE_TEMPLATE_UPDATED, template.updateZones);
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

      expect(set).to.be.calledWith({ zones, rule, isActive: true });
    });

    it('should set inactive state', () => {
      const name = 'banner';
      const set = template.set = spy();
      template.state = <any>{ rule: 'toy banner' };
      template.props = { target: 'default' };

      template.updateZones(<any>{ name });

      expect(set).to.be.calledWith({ zones: {}, rule: undefined, isActive: false });
    });

    it('should not call set()', () => {
      template.set = () => expect.fail();
      template.props = { target: 'top rated' };

      template.updateZones(<any>{ name: 'banner' });
    });
  });
});
