import { tag, ProductTransformer, Store, Structure, Tag } from '@storefront/core';
import Zone from '../zone';

@tag('gb-products-zone', require('./index.html'))
class ProductsZone {

  structure: Structure = this.config.structure;

  onBeforeMount() {
    const { products, ...zone } = this.props.zone;
    this.state = {
      ...zone,
      products: products.map((product) => ProductTransformer.transform(product, this.structure))
    };
    this.expose('zone');
  }
}

interface ProductsZone extends Tag<ProductsZone.Props> { }
namespace ProductsZone {
  export interface Props extends Zone.Props {
    zone: Store.ProductsZone;
  }
}

export default ProductsZone;
