import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroContext } from '../../context/context';
import './Main.css';
import '../../MediaQueries.css';

const Main = (props) => {
  const { selectedHeroHandler } = useContext(HeroContext);

  const navigate = useNavigate();

  const handleSelect = (hero) => {
    navigate(`./${hero.id}`, { replace: true });
    selectedHeroHandler(hero);
  };

  return (
    <div className='mainSection'>
      <main className='cardContainer'>
        {!props.loading &&
          props.characters.map((item, index) => {
            return (
              <div
                onClick={() => handleSelect(item)}
                key={item.id}
                className='card'
              >
                <img
                  className='cardImg'
                  src={`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`}
                  alt={`${item.name}`}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Main;
