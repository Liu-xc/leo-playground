import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './gallery.less';

export const Gallery = () => {
  const [img, setImg] = useState<string>();
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    img &&
      import(/* webpackPrefetch: true */ `../assets/${img}.jpg`)
        .then((res) => {
          setImgSrc(res.default);
        })
        .catch((e) => console.error(e));
  }, [img]);

  const getImage = useCallback(() => {
    setImg(Math.random() > 0.5 ? 'img1' : 'img2');
  }, []);

  return (
    <div className={styles.gallery}>
      {imgSrc ? (
        <>
          <img className={styles.img} src={imgSrc} />
          <div onClick={getImage}>refresh image</div>
        </>
      ) : (
        <div onClick={getImage}>get image</div>
      )}
    </div>
  );
};
