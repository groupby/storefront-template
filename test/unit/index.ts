import * as pkg from '../../src';
import Template from '../../src/template';
import Zone from '../../src/zone';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Template', () => {
    expect(pkg.Template).to.eq(Template);
  });

  it('should expose Zone', () => {
    expect(pkg.Zone).to.eq(Zone);
  });
});
