import { view, Component, ProductTransformer, Store, Structure } from '@storefront/core';
import Zone from '../zone';

@view('gb-products-zone', require('./index.html'))
class ProductsZone extends Component {
  structure: Structure = this.config.structure;
  props: ProductsZone.Props;

  onBeforeMount() {
    const { products, ...zone } = this.props.zone;
    this.state = {
      ...zone,
      products: products.map((product) => ProductTransformer.transform(product, this.structure))
    };
    this.expose('zone');
  }
}

namespace ProductsZone {
  export interface Props extends Zone.Props {
    zone: Store.ProductsZone;
  }
}

export default ProductsZone;
