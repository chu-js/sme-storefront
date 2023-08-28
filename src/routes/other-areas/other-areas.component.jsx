import { useState, useEffect, Fragment } from "react";

// getContent retrieves content from Firebase
import { getContent } from "../../utils/firebase/firebase.utils";

import Banner from "../../components/banner/banner.component";
import BannerWhiteBackground from "../../components/banner-white-bg/banner-white-bg.component";
import Loading from "../../components/loading/loading.component";

const OtherAreas = () => {
  const [content, setContent] = useState(null);
  const contentIds = ["c46", "c47"];

  useEffect(() => {
    const fetchContent = async () => {
      const result = await getContent(contentIds);
      setContent(result);
    };

    fetchContent();
  }, []);

  const convertNewlineToBreak = (text) => {
    return text.split("\n").map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  return (
    <>
      {!content ? (
        <Loading />
      ) : (
        <>
          {content.map((item, index) => {
            const Component = index % 2 === 0 ? Banner : BannerWhiteBackground;
            return (
              <Component
                key={index}
                title={item.content_title}
                shortform={convertNewlineToBreak(item.short_form)}
                url={item.url}
                related_material={item.related_material}
                cartable={false}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default OtherAreas;
