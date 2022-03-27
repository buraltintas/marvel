import './Main.css';
import '../../MediaQueries.css';
import LoadingSpinner from '../loading/LoadingSpinner';

const Main = (props) => {
  return (
    <div className='mainSection'>
      {props.loading && (
        <div className='loading'>
          <LoadingSpinner />
        </div>
      )}
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
