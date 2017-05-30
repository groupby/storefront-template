import { Component, Store, Tag } from '@storefront/core';

interface Zone extends Tag.Instance { }

class Zone {
  props: Zone.Props;

  onBeforeMount() {
    this.state = { ...this.props.zone };
    this.expose('zone');
  }
}

namespace Zone {
  export interface Props {
    zone: Store.Zone;
  }
}

export default Zone;
