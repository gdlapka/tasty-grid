const DeleteItemButton = ({ onClick }) => {
  return (
    <span className="tasty-grid-delete-item-button" { ...{ onClick } }>
      { '✖' }
    </span>
  );
};

export default DeleteItemButton;