const GridLine = ({lineData = [], headers = {}} = {}) => {
  return (
    <tr>
      { Object.keys(headers).map(header => (<td key={ header }>{ lineData?.[header] && lineData?.[header] }</td>)) }
    </tr>
  );
};

export default GridLine;