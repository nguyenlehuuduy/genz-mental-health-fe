import { Avatar } from "antd";
import Image from "next/image";
import { Fragment } from "react";

type PropsComponent = {
  filePath?: string;
  name: string;
  width?: number;
  height?: number;
};

export default function AvatarAccount(props: PropsComponent) {
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

  const getInitials = (name: string) => {
    if (!name) return ""; // Handle case where name is undefined or null
    const words = name.trim().split(" ");
    return words.length > 0 ? words[0][0].toUpperCase() : "";
  };

  const getBackgroundColor = (name: string) => {
    if (!name) return "red"; // Default background color for missing name
    // Calculate a more robust hash for background color selection
    const charCodeSum = name
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = charCodeSum % ColorList.length;
    return ColorList[index];
  };

  return (
    <Fragment>
      {props.filePath ? (
        <div
          className={`relative ${props.width ? `w-[${props.width}px]` : "w-[50px]"} ${props.height ? `h-[${props.height}px]` : "h-[50px]"}`}
        >
          <Image
            src={props.filePath}
            fill
            alt="avatar"
            objectFit="cover"
            className={`rounded-full`}
          />
        </div>
      ) : (
        <Avatar
          style={{
            backgroundColor: getBackgroundColor(props.name || ""), // Use default if no name
            verticalAlign: "middle",
            width: `${String(props.width) ?? "50"}px`,
            height: `${String(props.height) ?? "50"}px`,
          }}
          size="large"
        >
          {getInitials(props.name)}
        </Avatar>
      )}
    </Fragment>
  );
}
