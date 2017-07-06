const reducers = {
  example: (state = {}, { type, payload }) => {
    switch (type) {
      case 'EXAMPLE_ACTION':
        return {
          ...state
        };
      default:
        return state;
    }
  }
};

export default reducers;