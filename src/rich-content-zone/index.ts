import { view } from '@storefront/core';
import Zone from '../zone';

@view('gb-rich-content-zone', '<gb-raw content="{ $zone.content }"></gb-raw>')
class RichContentZone extends Zone { }

export default RichContentZone;
