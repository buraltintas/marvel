import { useContext } from 'react';
import { HeroContext } from '../../context/context';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

const Hero = () => {
  const { selectedHero } = useContext(HeroContext);

  const { t } = useTranslation();

  console.log(selectedHero);

  return (
    <>
      {selectedHero.name && (
        <div className={styles.heroContainer}>
          <div className={styles.heroHeading}>
            <img
              src={`${selectedHero.thumbnail.path}/portrait_uncanny.${selectedHero.thumbnail.extension}`}
              alt='hero'
            />
            <div>
              <h1>{selectedHero.name}</h1>
              <a
                href={selectedHero.urls[0].url}
                target='_blank'
                rel='noreferrer'
              >
                {t('details')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
