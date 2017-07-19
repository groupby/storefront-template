import { alias, configurable, tag, Events, Store, Tag } from '@storefront/core';

@configurable
@alias('template')
@tag('gb-template', require('./index.html'))
class Template {

  state: Template.State = {
    isActive: false,
    zones: {}
  };

  init() {
    this.flux.on(Events.TEMPLATE_UPDATED, this.updateZones);
  }

  updateZones = (template: Store.Template) => {
    if (this.state.rule !== template.rule) {
      const isActive = template.name === this.props.target;
      this.set({
        isActive,
        rule: template.rule,
        zones: isActive ? template.zones : {}
      });
    }
  }
}

interface Template extends Tag<Template.Props, Template.State> { }
namespace Template {
  export interface Props {
    target: string;
  }

  export interface State {
    isActive: boolean;
    rule?: string;
    zones: { [key: string]: Store.Zone };
  }
}

export default Template;
