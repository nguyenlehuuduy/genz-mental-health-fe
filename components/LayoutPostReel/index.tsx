import Image from "next/image";
import React, { Fragment } from "react";

type PropsComponent = {
  images: Array<string>;
  handleShowDetailPost: () => void;
};

const LayoutThreeImages: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <div className="w-full min-h-[500px] grid grid-cols-2 grid-rows-2 gap-2">
      <div className="col-span-1 row-span-2 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[0]}
          className="absolute h-full w-full object-contain"
        />
      </div>
      <div className="min-h-[300px] col-span-1 row-span-1 bg-slate-50 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[1]}
          className="absolute max-w-[500px] h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-200 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[2]}
          className="absolute h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const LayoutTwoImages: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <div className="w-full min-h-[500px] grid grid-cols-2 grid-rows-2 gap-2">
      <div className="col-span-1 row-span-2 relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[0]}
          className="absolute h-full w-full object-contain"
        />
      </div>
      <div className="col-span-1 row-span-2 relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[1]}
          className="absolute h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

const LayoutOneImages: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <div className="w-full min-h-[500px] grid grid-cols-2 grid-rows-2 gap-2">
      <div className="col-span-2 row-span-2 relative overflow-hidden ">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[0]}
          className="absolute h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

const LayoutFourImages: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <div className="w-full min-h-[500px] grid grid-cols-2 grid-rows-3 gap-2">
      <div className="col-span-1 row-span-3 relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[0]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-50 rounded-md relative overflow-hidden min-h-[250px]">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[1]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-200 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[2]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-200 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[3]}
          className="absolute h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

const LayoutManyImages: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <div className="w-full min-h-[500px] grid grid-cols-2 grid-rows-3 gap-2">
      <div className="col-span-1 row-span-3 relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[0]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-50 rounded-md relative overflow-hidden min-h-[250px]">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[1]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-200 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[2]}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 row-span-1 bg-slate-200 rounded-md relative overflow-hidden">
        <Image
          width={500}
          height={500}
          alt="image reel post"
          src={images[3]}
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute w-full h-full bg-slate-400 flex items-center justify-center opacity-70">
          <p className="text-white text-[30px]">+ {images.length - 4}</p>
        </div>
      </div>
    </div>
  );
};

export default function LayoutPostReel(props: PropsComponent) {
  const countImages: number = props.images.length ?? 0;
  switch (countImages) {
    case 0:
      return <Fragment />;
    case 1:
      return (
        <div className="cursor-pointer" onClick={props.handleShowDetailPost}>
          <LayoutOneImages images={props.images} />
        </div>
      );
    case 2:
      return (
        <div className="cursor-pointer" onClick={props.handleShowDetailPost}>
          <LayoutTwoImages images={props.images} />{" "}
        </div>
      );
    case 3:
      return (
        <div className="cursor-pointer" onClick={props.handleShowDetailPost}>
          <LayoutThreeImages images={props.images} />
        </div>
      );
    case 4:
      return (
        <div className="cursor-pointer" onClick={props.handleShowDetailPost}>
          <LayoutFourImages images={props.images} />
        </div>
      );
    default:
      return (
        <div className="cursor-pointer" onClick={props.handleShowDetailPost}>
          <LayoutManyImages images={props.images} />
        </div>
      );
  }
}
