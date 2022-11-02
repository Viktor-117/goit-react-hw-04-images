import { LoadBtn } from './Button.styled';

export default function Button({ btnClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <LoadBtn onClick={btnClick}>Load more</LoadBtn>
    </div>
  );
}
