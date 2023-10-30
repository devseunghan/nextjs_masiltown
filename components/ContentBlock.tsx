import LeftContentBlock from "./LeftBlock";
import RightContentBlock from "./RightBlock";

export type ContentBlockProps = {
  icon: string;
  title: string;
  content: string;
  section?: any;
  button?: any;
  id: string;
  type?: string;
}

export default function ContentBlock(props: ContentBlockProps) {
  if (props.type === "left") return <LeftContentBlock {...props} />;
  if (props.type === "right") return <RightContentBlock {...props} />;
  return null;
};
