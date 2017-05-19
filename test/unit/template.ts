import { Component, Events } from '@storefront/core';
import Template from '../../src/template';
import suite from './_suite';

suite('Template', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.flux;
      delete Component.prototype.expose;
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.flux = <any>{ on: () => null };

      new Template();

      expect(expose.calledWith('template')).to.be.true;
    });

    it('should listen for TEMPLATE_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };
      Component.prototype.expose = () => null;

      const template = new Template();

      expect(on.calledWith(Events.TEMPLATE_UPDATED, template.updateZones)).to.be.true;
    });
  });

  describe('actions', () => {
    let template: Template;

    before(() => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };
    });
    after(() => {
      delete Component.prototype.flux;
      delete Component.prototype.expose;
    });
    beforeEach(() => template = new Template());

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
});
