import { view, Component } from '@storefront/core';
import Zone from '../zone';

@view('gb-content-zone', '{ $zone.content }')
class ContentZone extends Zone { }

export default ContentZone;
