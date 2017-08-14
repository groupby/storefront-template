import { alias, configurable, tag, Events, Store, Tag } from '@storefront/core';

@configurable
@alias('template')
@tag('gb-template', require('./index.html'))
class Template {

  $sayt?: any;
  state: Template.State = {
    isActive: false,
    zones: {}
  };

  init() {
    if (this.$sayt) {
      this.flux.on(Events.AUTOCOMPLETE_TEMPLATE_UPDATED, this.updateZones);
    } else {
      this.flux.on(Events.TEMPLATE_UPDATED, this.updateZones);
    }
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
  export interface Props extends Tag.Props {
    target: string;
  }

  export interface State {
    isActive: boolean;
    rule?: string;
    zones: { [key: string]: Store.Zone };
  }
}

export default Template;
