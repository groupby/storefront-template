import { configurable, consume, provide, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@configurable
@consume('sayt')
@provide('template')
@tag('gb-template', require('./index.html'))
class Template {
  aliases: Template.Aliases;
  state: Template.State = {
    isActive: false,
    zones: {},
  };

  init() {
    if (this.aliases.sayt) {
      this.subscribe(Events.AUTOCOMPLETE_TEMPLATE_UPDATED, this.updateZones);
      this.updateZones(this.select(Selectors.autocompleteTemplate));
    } else {
      this.subscribe(Events.TEMPLATE_UPDATED, this.updateZones);
      this.updateZones(this.select(Selectors.template));
    }
  }

  updateZones = (template: Store.Template) => {
    if (this.state.rule !== template.rule) {
      const isActive = template.name === this.props.target;

      this.set({
        isActive,
        rule: template.rule,
        zones: isActive ? template.zones : {},
      });
    }
  };
}

interface Template extends Tag<Template.Props, Template.State> {}
namespace Template {
  export interface Props extends Tag.Props {
    target: string;
  }

  export interface State {
    isActive: boolean;
    rule?: string;
    zones: { [key: string]: Store.Zone };
  }

  export interface Aliases {
    sayt: any;
  }
}

export default Template;
