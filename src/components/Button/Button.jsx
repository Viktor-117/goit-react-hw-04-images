import { LoadBtn } from './Button.styled';

const Button = ({ btnClick }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <LoadBtn onClick={btnClick}>Load more</LoadBtn>
    </div>
  );
};

export default Button;
