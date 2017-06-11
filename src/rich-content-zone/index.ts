import { tag } from '@storefront/core';
import Zone from '../zone';

@tag('gb-rich-content-zone', '<gb-raw content="{ $zone.content }"></gb-raw>')
export default class RichContentZone extends Zone { }
