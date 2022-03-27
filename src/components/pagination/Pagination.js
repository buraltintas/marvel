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
              {props.currentPage - 3}
            </span>
          )}
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

          <span onClick={(e) => props.nextPage(e.target.innerText)}>
            {props.currentPage + 1}
          </span>

          <img
            onClick={() => props.nextPage(props.currentPage + 1)}
            className='arrow'
            src={arrowRight}
            alt='right arrow icon'
          />
        </footer>
      )}
    </>
  );
};

export default Pagination;
