import './Header.css';
import '../../MediaQueries.css';

import marvelImage from './image 1.png';
import marvelLogo from './image 2.png';

const Header = () => {
  return (
    <header className='header'>
      <img className='marvelImage' src={marvelImage} alt='Marvel characters' />
      <div className='marvelLogo'>
        <img className='marvelLogoImg' src={marvelLogo} alt='Marvel logo' />
      </div>
    </header>
  );
};

export default Header;
