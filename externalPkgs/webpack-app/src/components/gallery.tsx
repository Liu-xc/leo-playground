import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './gallery.less';

export const Gallery = () => {
  const [img, setImg] = useState('');
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    import(`../assets/${img}.jpg`).then((res) => {
      setImgSrc(res.default);
    });
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
