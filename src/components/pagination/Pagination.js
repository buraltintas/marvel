import './Pagination.css';
import '../../MediaQueries.css';

import arrowRight from './arrow-right.png';
import arrowLeft from './arrow-left.png';

const Pagination = (props) => {
  return (
    <>
      {!props.loading && (
        <footer className='pagination'>
          {props.currentPage > 1 && (
            <img
              onClick={() => props.nextPage(props.currentPage - 1)}
              className='arrow'
              src={arrowLeft}
              alt='left arrow icon'
            />
          )}

          {props.currentPage > 3 && (
            <span onClick={(e) => props.nextPage(e.target.innerText * 1)}>
              1
            </span>
          )}

          {props.currentPage > 4 && <span className='dots'>. . .</span>}

          {props.currentPage > 2 && (
            <span onClick={(e) => props.nextPage(e.target.innerText * 1)}>
              {props.currentPage - 2}
            </span>
          )}
          {props.currentPage > 1 && (
            <span onClick={(e) => props.nextPage(e.target.innerText * 1)}>
              {props.currentPage - 1}
            </span>
          )}
          <span className='active'>{props.currentPage}</span>

          {!(
            props.currentPage === Math.ceil(props.totalCharactersNumber / 20)
          ) &&
            props.currentPage + 1 !==
              Math.ceil(props.totalCharactersNumber / 20) && (
              <span onClick={(e) => props.nextPage(e.target.innerText)}>
                {props.currentPage + 1}
              </span>
            )}

          {!(
            props.currentPage === Math.ceil(props.totalCharactersNumber / 20)
          ) &&
            props.currentPage + 1 !==
              Math.ceil(props.totalCharactersNumber / 20) && (
              <span onClick={(e) => props.nextPage(e.target.innerText)}>
                {props.currentPage + 2}
              </span>
            )}

          {props.currentPage + 4 <=
            Math.ceil(props.totalCharactersNumber / 20) && (
            <span className='dots'>. . .</span>
          )}

          {props.currentPage + 2 !==
            Math.ceil(props.totalCharactersNumber / 20) &&
            props.currentPage !==
              Math.ceil(props.totalCharactersNumber / 20) && (
              <span onClick={(e) => props.nextPage(e.target.innerText)}>
                {Math.ceil(props.totalCharactersNumber / 20)}
              </span>
            )}

          {!(
            props.currentPage === Math.ceil(props.totalCharactersNumber / 20)
          ) && (
            <img
              onClick={() => props.nextPage(props.currentPage + 1)}
              className='arrow'
              src={arrowRight}
              alt='right arrow icon'
            />
          )}
        </footer>
      )}
    </>
  );
};

export default Pagination;
