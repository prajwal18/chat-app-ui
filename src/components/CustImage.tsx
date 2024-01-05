import { FC, useEffect, useState } from "react";
import { baseURL } from "../utils/endpoint";

interface ICustImage {
  src: string;
  errImg: any;
  style: any;
  alt: string;
}
const CustImage: FC<ICustImage> = ({ src, errImg, style, alt }) => {
  const [srcPic, setSrcPic] = useState<any>(null);
  useEffect(() => {
    let newSrc = src;
    console.log(src);
    if (!newSrc || typeof newSrc == "string") {
      newSrc = baseURL + newSrc;
    }
    /*
      Delete the below if statement
    */
    if (src && src.slice(0, 5) == "data:") {
      newSrc = src;
    }

    setSrcPic(newSrc);
  }, [src]);
  return (
    <>
      <img
        src={srcPic}
        alt={alt}
        style={style}
        onError={(_e: any) => {
          setSrcPic(errImg);
        }}
      />
    </>
  );
};

export default CustImage;
