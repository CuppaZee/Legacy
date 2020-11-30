
import * as React from 'react';
const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;


    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ width: any; height: any; }' is... Remove this comment to see the full error message
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
export default useComponentSize;