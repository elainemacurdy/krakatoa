import React from 'react';
import { initialize } from 'redux-form';

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
  return class WithReinitializeForm extends React.Component {
    static displayName = `WithReinitializeForm(${getComponentDisplayName(ComposedComponent)})`;

    componentWillReceiveProps(nextProps) {
      const { dispatch, form, initialValues } = this.props;
      const nextInitialValues = nextProps.initialValues;
      const isInitialValuesChanging = !Object.is(initialValues, nextInitialValues);
      if (isInitialValuesChanging) {
        dispatch(initialize(form, nextInitialValues));
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
}
