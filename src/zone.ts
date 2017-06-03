import { Store, Tag } from '@storefront/core';

abstract class Zone {

  init() {
    this.expose('zone', this.props.zone);
  }
}

interface Zone extends Tag<Zone.Props> { }
namespace Zone {
  export interface Props {
    zone: Store.Zone;
  }
}

export default Zone;
