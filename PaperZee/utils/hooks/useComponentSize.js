import * as React from 'react';
const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
export default useComponentSize;