type Props = {
  showButton: boolean;
  onButtonClick: () => void;
}

function ShowMoreButton({ showButton, onButtonClick }: Props): JSX.Element {
  return (
    <div className="catalog__more" style={showButton ? {} : { display: 'none' }}>
      <button className="catalog__button" type="button" onClick={onButtonClick}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;

