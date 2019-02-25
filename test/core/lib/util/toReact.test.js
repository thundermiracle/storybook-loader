import renderer from 'react-test-renderer';

import { toReact } from 'core/lib/util';

test('[string]input is string', () => {
  const originStr = 'origin';
  const result = toReact(originStr);
  expect(typeof result).toEqual('function');
});

test('React component can be rendered', () => {
  const divReact = require('test/mocks/DivReact').default;
  const ToReactComponent = toReact(divReact);

  const component = renderer.create(
    <ToReactComponent content="First" />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
