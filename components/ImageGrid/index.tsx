import Image from "next/image";
import { Image as ImageAnt } from "antd";

const ImageGrid = ({
  images,
  isPreview,
}: {
  images: string[];
  isPreview?: boolean;
}) => {
  return (
    <>
      {isPreview ? (
        <div className="w-full mb-3">
          {images.length === 1 && (
            <div className="relative custom-ant-image w-full h-full rounded-md overflow-hidden">
              <ImageAnt
                src={images[0]}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative custom-ant-image min-h-[500px] rounded-md overflow-hidden"
                >
                  <ImageAnt
                    src={image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {images.length === 3 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="relative custom-ant-image col-span-1 max-h-[500px] rounded-md overflow-hidden">
                <ImageAnt
                  src={images[0]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative custom-ant-image h-[250px] rounded-md overflow-hidden"
                  >
                    <ImageAnt
                      src={image}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 4 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative custom-ant-image max-h-[250px] rounded-md overflow-hidden"
                >
                  <ImageAnt
                    src={image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {images.length === 5 && (
            <div className="grid grid-rows-2 gap-2">
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="relative custom-ant-image max-h-[250px] rounded-md overflow-hidden"
                  >
                    <ImageAnt
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.slice(2, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative custom-ant-image max-h-[250px] rounded-md overflow-hidden"
                  >
                    <ImageAnt
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length >= 6 && (
            <div className="grid grid-rows-2 gap-2">
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="relative custom-ant-image max-h-[250px] rounded-md overflow-hidden"
                  >
                    <ImageAnt
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[250px]">
                {images.slice(2, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative custom-ant-image max-h-[250px] rounded-md overflow-hidden"
                  >
                    <ImageAnt
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
                {images.length > 5 && (
                  <div className="relative max-h-[250px] rounded-md overflow-hidden">
                    <ImageAnt
                      src={images[5]}
                      style={{
                        width: "100%",
                        minHeight: "250px",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                      +{images.length - 5}
                    </div>
                    {images.slice(5).map((image, index) => (
                      <div
                        key={index}
                        className="hidden max-h-[250px] rounded-md overflow-hidden"
                      >
                        <ImageAnt
                          src={image}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full mb-3">
          {images.length === 1 && (
            <div className="relative w-full h-[500px] rounded-md overflow-hidden">
              <Image
                src={images[0]}
                layout="fill"
                objectFit="cover"
                quality={100}
                alt="image-0"
                className="absolute w-full h-full"
              />
            </div>
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative min-h-[500px] rounded-md overflow-hidden"
                >
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={`image-${index}`}
                    className="absolute w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {images.length === 3 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="relative col-span-1 h-[500px] rounded-md overflow-hidden">
                <Image
                  src={images[0]}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="image-0"
                  className="absolute w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                {images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[250px] rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt={`image-${index + 1}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 4 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[250px] rounded-md overflow-hidden"
                >
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={`image-${index}`}
                    className="absolute w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {images.length === 5 && (
            <div className="grid grid-rows-2 gap-2">
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt={`image-${index}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.slice(2, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[250px] rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt={`image-${index + 2}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length >= 6 && (
            <div className="grid grid-rows-2 gap-2 ">
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt={`image-${index}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 ">
                {images.slice(2, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[250px] rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt={`image-${index + 2}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                ))}
                {images.length > 5 && (
                  <div className="relative h-[250px] rounded-md overflow-hidden">
                    <Image
                      src={images[5]}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt="image-5"
                      className="absolute w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                      +{images.length - 5}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGrid;
