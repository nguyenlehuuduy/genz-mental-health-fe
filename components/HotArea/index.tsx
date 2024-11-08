import { HotContentForCard } from "@/service/hotContentService";
import Image from "next/image";
import Link from "next/link";

type PropsComponent = {
  listHotContent: Array<HotContentForCard>;
};
const HotArea = (props: PropsComponent) => {
  return (
    <div className="w-full p-3 bg-white rounded-md">
    <span className="text-[#0F52BA] font-bold pb-3">Gen Z Mental Health Podcast - Episode 1</span>
    <iframe
      src="https://podcasters.spotify.com/pod/show/genz-mental-health/embed/episodes/1---Lm-Th-No--Vt-Qua-FOMO-Ni-S-B-L-e2jsugt/a-ab9k8pm"
      height="102"
      width="400"
      frameBorder="0"
      scrolling="no"
      style={{ borderRadius: "12px" }}
    ></iframe>

    <span className="text-[#0F52BA] font-bold pb-3">Gen Z Mental Health Podcast - Episode 2</span>
    <iframe
        src="https://podcasters.spotify.com/pod/show/genz-mental-health/embed/episodes/1---Lm-Th-No--Vt-Qua-FOMO-Ni-S-B-L-e2jsugt/a-ab9k8pm"
      height="102"
      width="400"
      frameBorder="0"
      scrolling="no"
      style={{ borderRadius: "12px" }}
    ></iframe>
    
  </div>
  );
};

export default HotArea;
