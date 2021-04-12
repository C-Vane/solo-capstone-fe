export default function (state = {}, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
