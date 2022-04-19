import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroContext } from '../../context/context';
import { useTranslation } from 'react-i18next';
import * as i18n from 'i18next';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [activeLang, setActiveLang] = useState('tr');
  const { getData, searchedHeros, selectedHeroHandler } =
    useContext(HeroContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
    setActiveLang(e.target.value);
  };

  const inputHandler = (e) => {
    getData(e.target.value);
    setInput(e.target.value);
  };

  const selectHandler = (e) => {
    selectedHeroHandler(e);
    navigate(`./${e.id}`, { replace: true });
    setInput('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <label htmlFor='input'>{t('searchCharacter')}</label>
      <div className={styles.searchBar}>
        {input.length > 0 && (
          <svg
            onClick={() => setInput('')}
            className={styles.deleteInputIcon}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        )}
        <input
          id='input'
          className={styles.searchInput}
          type='text'
          placeholder={t('searchCharacterName')}
          value={input}
          onChange={inputHandler}
        />
        {input.length > 0 && (
          <div className={styles.dropdownContainer}>
            {searchedHeros.length > 0 ? (
              input.length > 0 &&
              searchedHeros.map((hero) => (
                <span onClick={() => selectHandler(hero)}>
                  {t('characterName')}: {hero.name}
                </span>
              ))
            ) : (
              <span>{t('notfound')}</span>
            )}
          </div>
        )}
      </div>
      <div className={styles.languages}>
        <button
          className={activeLang === 'fr' && styles.active}
          value='fr'
          onClick={changeLang}
        >
          FR
        </button>
        <button
          className={activeLang === 'en' && styles.active}
          value='en'
          onClick={changeLang}
        >
          EN
        </button>
        <button
          className={activeLang === 'tr' ? styles.active : ''}
          value='tr'
          onClick={changeLang}
        >
          TR
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
