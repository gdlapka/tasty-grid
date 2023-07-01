
const GridLine = ({lineData = []}) => {
  return (
    <tr>
      <td>{ lineData?.id && lineData?.id }</td>
      <td>{ lineData?.postId && lineData?.postId }</td>
      <td>{ lineData?.name && lineData?.name }</td>
      <td>{ lineData?.email && lineData?.email }</td>
      <td>{ lineData?.body && lineData?.body }</td>
    </tr>
  );
};

export default GridLine;