// eslint-disable-next-line react/prop-types
const ButtonComponent = ({ handleSubmit, gameOver }) => {
  return (
    <button onClick={handleSubmit} disabled={gameOver}>
      Adivinar
    </button>
  );
};

export default ButtonComponent;