"use client"

import dynamic from "next/dynamic";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { convContentAssetSrc } from "@/lib/utils";

type PropComponent = {
  bodyHTML: string;
}

const CustomEditor = dynamic(() => import('./ckeditor'), { ssr: false });
export default function ParsingHTMLCKeitor(props: PropComponent) {
  const [html, setHtml] = useState(false);
  return (<div className="relative">
    <div className="hidden" id="ckEditor">
      <CustomEditor
        onReady={() => setHtml(true)}
        // listToolbar={[]}
        initialData={DOMPurify.sanitize(convContentAssetSrc(
          props.bodyHTML ?? "",
          `{replace_hostname}/contents/assets/`,
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/assets/`,
        ))}
      />
    </div>
    {html && (
      <div
        dangerouslySetInnerHTML={{
          __html: document.getElementsByClassName("ck ck-editor__main")[0]?.innerHTML.replace(
            /contenteditable=/g,
            "",
          ).replace(/<svg\b[^>]*>(.*?)<\/svg>/g, "").replace(/ck-widget/g, ""),
        }}
      />
    )}
  </div>
  )

}

