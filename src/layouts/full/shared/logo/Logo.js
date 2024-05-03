import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

// Import your PNG logo image
import logoImage from './logo-dark.png';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={logoImage} alt="Logo" height={70} style={{ width: '100%' }} />
    </LinkStyled>
  );
};

export default Logo;
