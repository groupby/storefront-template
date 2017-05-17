import { view, Component, Events, Store } from '@storefront/core';

@view('gb-template', require('./index.html'), require('./index.css'))
class Template extends Component {

  props: Template.Props;
  state: Template.State = {
    isActive: false,
    zones: {}
  };

  constructor() {
    super();
    this.expose('template');
    this.flux.on(Events.TEMPLATE_UPDATED, this.updateZones);
  }

  updateZones = (template: Store.Template) => {
    const isActive = template.name === this.props.target;
    if (!this.state.isActive !== !isActive) {
      this.set({
        isActive,
        rule: isActive ? template.rule : null,
        zones: isActive ? template.zones : {}
      });
    }
  }
}

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
