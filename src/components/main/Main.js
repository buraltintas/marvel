import './Main.css';
import '../../MediaQueries.css';
import { useEffect, useRef } from 'react';

const Main = (props) => {
  const main = useRef();

  useEffect(() => {
    console.log('ok');

    main.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [props.characters]);

  return (
    <div ref={main} className='mainSection'>
      <main className='cardContainer'>
        {!props.loading &&
          props.characters.map((item, index) => {
            return (
              <div key={index} className='card'>
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
