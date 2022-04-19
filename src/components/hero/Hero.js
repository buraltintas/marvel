import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [comics, setComics] = useState(null);

  const navigate = useNavigate();

  const params = useParams();

  const ts = new Date().getTime();

  const { t } = useTranslation();

  const urlComics = `https://gateway.marvel.com:443/v1/public/characters/${params.id}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=${process.env.REACT_APP_PUBLIC_KEY}`;
  const urlHero = `https://gateway.marvel.com:443/v1/public/characters/${params.id}?apikey=${process.env.REACT_APP_PUBLIC_KEY}`;

  const getData = async () => {
    const resComics = await axios.get(urlComics);
    const resHero = await axios.get(urlHero);

    setHero(resHero.data.data.results[0]);
    setComics(resComics.data.data.results);
  };

  useEffect(() => {
    console.log(params.id);
    getData();
  }, [params.id]);

  console.log(comics);

  return (
    <>
      <div className={styles.goBack}>
        <button
          onClick={() => navigate(`/`, { replace: true })}
          className={styles.goBackButton}
        >
          {t('goBack')}
        </button>
      </div>
      {hero && (
        <div className={styles.heroContainer}>
          <div className={styles.heroHeading}>
            <img
              src={`${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`}
              alt='hero'
            />
            <div className={styles.heroInfo}>
              <div>
                <h1>{hero.name}</h1>
                <a href={hero.urls[0].url} target='_blank' rel='noreferrer'>
                  {t('details')}
                </a>
              </div>
              {hero.description ? (
                <p className={styles.info}>{hero.description}</p>
              ) : (
                <p className={styles.noInfo}>{t('noInfo')}</p>
              )}

              {comics && comics.length > 0 ? (
                <div className={styles.comics}>
                  <h3>{t('comics')}</h3>
                  {comics &&
                    comics.reverse().map((comics) => <p>{comics.title}</p>)}
                </div>
              ) : (
                <p className={styles.noInfo}>{t('noComics')}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
