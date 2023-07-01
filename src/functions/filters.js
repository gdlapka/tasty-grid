const perPageRegex = new RegExp(/[0-9]+/);

export const numberFilter = e => {
  if (!perPageRegex.test(e.nativeEvent.data)) {
    e.preventDefault();
  }
}
