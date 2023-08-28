// Banners displayed change based on user's reason selected for visiting the site.

import { useEffect, useState } from "react";
// getContent retrieves content from Firebase
import { getContent } from "../../utils/firebase/firebase.utils";

// Banner has a photo that covers the background.
import Banner from "../banner/banner.component";
// BannerWhiteBackground has a white background to alternate with Banner.
import BannerWhiteBackground from "../banner-white-bg/banner-white-bg.component";
import Loading from "../loading/loading.component";

const ConditionalBanners = ({ reason }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let contentIds;

    switch (reason) {
      case "Beautify":
        contentIds = ["c37", "c30", "c09", "c16"];
        break;
      case "Safety - anti slip":
        contentIds = ["c17", "c41", "c23", "c16"];
        break;
      case "Facing toilet issues":
        contentIds = ["c01", "c02", "c03", "c16"];
        break;
      default:
        contentIds = [];
    }

    const fetchContent = async () => {
      const result = await getContent(contentIds);
      setContent(result);
    };

    fetchContent();
  }, [reason]);

  return (
    <>
      {!content ? (
        <Loading />
      ) : (
        <div>
          {content.map((item, index) => {
            const Component = index % 2 === 0 ? BannerWhiteBackground : Banner;
            return (
              <Component
                key={index}
                title={item.slogan}
                shortform={item.short_form}
                url={item.url}
                related_material={item.related_material}
                cartable={true}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ConditionalBanners;
