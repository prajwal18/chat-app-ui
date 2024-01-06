import { FC, useEffect, useState } from "react";
import convertToBase64 from "../utils/convertToBase64";

interface ICustImage {
  src: string;
  errImg: any;
  style: any;
  alt: string;
}
const CustImage: FC<ICustImage> = ({ src, errImg, style, alt }) => {
  const [srcPic, setSrcPic] = useState<any>(null);
  useEffect(() => {
    if (src) {
      if (typeof src === "string") {
        setSrcPic(src);
      } else {
        convertToBase64(src).then((value: any) => {
          setSrcPic(value);
        });
      }
    } else {
      setSrcPic(errImg);
    }
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
