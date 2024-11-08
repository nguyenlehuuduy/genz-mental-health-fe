"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Star from "../Star";
import { aiMentalHeathQuote } from "./action";
import { MessageSorrowForGet } from "@/service/aiService";
import { Input } from "antd";

const LIST_BG = [
  "/bg_sendSorrow/bg_phienmuon1.png",
  "/bg_sendSorrow/bg_phienmuon2.png",
  "/bg_sendSorrow/bg_phienmuon3.png",
  "/bg_sendSorrow/bg_phienmuon4.png",
  "/bg_sendSorrow/bg_phienmuon5.png",
  "/bg_sendSorrow/bg_phienmuon6.png",
  "/bg_sendSorrow/bg_phienmuon7.png",
  "/bg_sendSorrow/bg_phienmuon8.png",
  "/bg_sendSorrow/bg_phienmuon9.png",
  "/bg_sendSorrow/bg_phienmuon10.png",
  "/bg_sendSorrow/bg_phienmuon11.png",
  "/bg_sendSorrow/bg_phienmuon12.png",
  "/bg_sendSorrow/bg_phienmuon13.png",
];

export default function SendSorrow({ listSound }: { listSound: any }) {
  const initialStars = Array.from({ length: 50 }, () => Date.now());
  const [stars, setStars] = useState<number[]>([...initialStars]);
  const [message, setMessage] = useState<string>();
  const [moveUp, setMoveUp] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string>(LIST_BG[0]);
  const [msgMentalHeath, setMsgMentalHeath] = useState<MessageSorrowForGet>()
  const [step, setStep] = useState<number>(0);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (message) {
      setMsgMentalHeath({ mentalHeathQuote: '', arrayQuote: ['Thả lỏng và thư giãn một tí cậu nhé !'] })
      playAudio();
      await aiMentalHeathQuote(message).then(res => {
        if (res) {
          setMsgMentalHeath(res);
        }
      })

    }
  };

  useEffect(() => {
    if (msgMentalHeath?.arrayQuote.length) {
      setTimeout(() => {
        setMoveUp(true);
      }, 60000);

      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => {
          if (prevIndex + 1 === msgMentalHeath?.arrayQuote.length) {
            clearInterval(interval);
          } else {
            setShowMessage(false);
          }
          return prevIndex + 1;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgMentalHeath]);


  useEffect(() => {
    if (!showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(true); // Hiển thị message mới sau khoảng thời gian nhất định
      }, 5000); // Thời gian delay trước khi hiển thị message mới
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMessage]);

  // Tạo ngôi sao
  useEffect(() => {
    const interval = setInterval(() => {
      if (stars.length < 100) {
        // Chỉ thêm một ngôi sao mới nếu số lượng ngôi sao trong danh sách nhỏ hơn 100
        setStars((prevStars: number[]) => [...prevStars, Date.now()]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [stars.length]);

  const removeStar = () => {
    setStars((prevStars: number[]) => prevStars.slice(1));
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const renderLastMessage = () => {
    return (
      <div className="flex flex-col gap-[26px] max-w-[710px] w-full m-auto p-6 rounded-lg relative">
        <div className="flex flex-row justify-between items-center">
          <svg
            width="44"
            height="29"
            viewBox="0 0 44 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3317_23839)">
              <path
                d="M9.15248 27.4815C13.2559 27.4815 16.5823 24.1086 16.5823 19.9478C16.5823 15.787 13.2559 12.4141 9.15248 12.4141C5.0491 12.4141 1.72266 15.787 1.72266 19.9478C1.72266 24.1086 5.0491 27.4815 9.15248 27.4815Z"
                fill="white"
              />
              <path
                d="M9.1518 28.8519C4.31025 28.8519 0.371094 24.8577 0.371094 19.9484C0.371094 15.0392 4.31025 11.0449 9.1518 11.0449C13.9933 11.0449 17.9325 15.0392 17.9325 19.9484C17.9325 24.8577 13.9933 28.8519 9.1518 28.8519ZM9.1518 13.7845C5.80027 13.7845 3.07285 16.55 3.07285 19.9484C3.07285 23.3468 5.80027 26.1124 9.1518 26.1124C12.5033 26.1124 15.2307 23.3468 15.2307 19.9484C15.2307 16.55 12.5033 13.7845 9.1518 13.7845Z"
                fill="white"
              />
              <path
                d="M32.1173 27.4815C36.2207 27.4815 39.5471 24.1086 39.5471 19.9478C39.5471 15.787 36.2207 12.4141 32.1173 12.4141C28.0139 12.4141 24.6875 15.787 24.6875 19.9478C24.6875 24.1086 28.0139 27.4815 32.1173 27.4815Z"
                fill="white"
              />
              <path
                d="M32.1166 28.8519C27.2751 28.8519 23.3359 24.8577 23.3359 19.9484C23.3359 15.0392 27.2751 11.0449 32.1166 11.0449C36.9582 11.0449 40.8973 15.0392 40.8973 19.9484C40.8973 24.8577 36.9582 28.8519 32.1166 28.8519ZM32.1166 13.7845C28.7651 13.7845 26.0377 16.55 26.0377 19.9484C26.0377 23.3468 28.7651 26.1124 32.1166 26.1124C35.4682 26.1124 38.1956 23.3468 38.1956 19.9484C38.1956 16.55 35.4682 13.7845 32.1166 13.7845Z"
                fill="white"
              />
              <path
                d="M1.72197 20.6325C0.974936 20.6325 0.371094 20.0202 0.371094 19.2627C0.371094 8.6881 8.8546 0.0859375 19.2834 0.0859375C20.0304 0.0859375 20.6343 0.698225 20.6343 1.45571C20.6343 2.21319 20.0304 2.82548 19.2834 2.82548C10.3446 2.82548 3.07285 10.199 3.07285 19.2627C3.07285 20.0202 2.46901 20.6325 1.72197 20.6325Z"
                fill="white"
              />
              <path
                d="M24.6868 20.6325C23.9398 20.6325 23.3359 20.0202 23.3359 19.2627C23.3359 8.6881 31.8194 0.0859375 42.2482 0.0859375C42.9953 0.0859375 43.5991 0.698225 43.5991 1.45571C43.5991 2.21319 42.9953 2.82548 42.2482 2.82548C33.3095 2.82548 26.0377 10.199 26.0377 19.2627C26.0377 20.0202 25.4338 20.6325 24.6868 20.6325Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3317_23839">
                <rect width="44" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="px-[14px] py-[12px] bg-white text-[#0F52BA] text-lg rounded-full tracking-wider font-bold">
            GenZ{" "}
            <span className="bg-[#0F52BA] text-white px-1 py-0.5 rounded-md">
              MH
            </span>
          </p>
        </div>
        <p className="text-[28px] text-white max-w-[526px] w-full mx-auto">
          {msgMentalHeath?.mentalHeathQuote ?? 'Hy vọng rằng bạn sẽ thấy bớt căng thẳng hơn và kết nối được nhiều hơn'}

        </p>
        <svg
          width="45"
          height="31"
          viewBox="0 0 45 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-end"
        >
          <g clip-path="url(#clip0_3317_23827)">
            <path
              d="M34.8795 1.78791C30.7779 1.90934 27.5527 5.37928 27.6759 9.53822C27.799 13.6972 31.2238 16.9702 35.3254 16.8488C39.427 16.7273 42.6521 13.2574 42.529 9.09847C42.4059 4.93952 38.9811 1.66647 34.8795 1.78791Z"
              fill="white"
            />
            <path
              d="M34.8387 0.419621C39.6782 0.27634 43.7338 4.15227 43.8791 9.05937C44.0244 13.9665 40.2051 18.0756 35.3657 18.2188C30.5263 18.3621 26.4707 14.4862 26.3254 9.57909C26.1801 4.67198 29.9993 0.562901 34.8387 0.419621ZM35.2846 15.4805C38.6347 15.3813 41.2791 12.5362 41.1785 9.13933C41.0779 5.74242 38.2699 3.05878 34.9198 3.15796C31.5698 3.25715 28.9254 6.10222 29.0259 9.49913C29.1265 12.896 31.9346 15.5797 35.2846 15.4805Z"
              fill="white"
            />
            <path
              d="M11.9244 2.46759C7.82282 2.58903 4.59765 6.05896 4.72078 10.2179C4.84391 14.3769 8.26872 17.6499 12.3703 17.5285C16.4719 17.407 19.6971 13.9371 19.5739 9.77816C19.4508 5.61921 16.026 2.34616 11.9244 2.46759Z"
              fill="white"
            />
            <path
              d="M11.8837 1.09931C16.7231 0.956028 20.7787 4.83195 20.924 9.73906C21.0693 14.6462 17.2501 18.7552 12.4106 18.8985C7.57122 19.0418 3.51558 15.1659 3.3703 10.2588C3.22501 5.35167 7.04424 1.24259 11.8837 1.09931ZM12.3296 16.1602C15.6796 16.061 18.324 13.2159 18.2234 9.81902C18.1229 6.42211 15.3148 3.73846 11.9647 3.83765C8.61468 3.93683 5.9703 6.78191 6.07087 10.1788C6.17144 13.5757 8.97951 16.2594 12.3296 16.1602Z"
              fill="white"
            />
            <path
              d="M42.5085 8.41648C43.2552 8.39437 43.8769 8.98852 43.8993 9.74568C44.2122 20.3157 35.987 29.1651 25.5628 29.4738C24.8161 29.4959 24.1944 28.9017 24.172 28.1446C24.1496 27.3874 24.735 26.7575 25.4817 26.7354C34.4166 26.4709 41.4669 18.8854 41.1987 9.82563C41.1763 9.06848 41.7617 8.43859 42.5085 8.41648Z"
              fill="white"
            />
            <path
              d="M19.5534 9.09617C20.3001 9.07406 20.9218 9.66821 20.9442 10.4254C21.2571 20.9954 13.0319 29.8448 2.60772 30.1534C1.86101 30.1755 1.23932 29.5814 1.2169 28.8242C1.19448 28.0671 1.77994 27.4372 2.52665 27.4151C11.4615 27.1506 18.5119 19.5651 18.2436 10.5053C18.2212 9.74817 18.8067 9.11828 19.5534 9.09617Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3317_23827">
              <rect
                width="44"
                height="29"
                fill="white"
                transform="translate(44.8398 28.9883) rotate(178.304)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  };

  useEffect(() => {
    setTimeout(() => setStep(1), 3000);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="h-screen overflow-hidden relative bg-cover"
      style={{ backgroundImage: `url(${selectedBg})` }}
    >
      {step === 0 ? (
        <div
          className={`flex flex-col gap-[30px] w-full max-w-[600px] justify-center items-center absolute top-[10%] left-1/2 transform -translate-x-1/2`}
        >
          <div className="text-[#ffffff] flex flex-col pt-10 justify-center items-center font-medium ">
            <p className="text-7xl">Gửi phiền muộn</p>
            <p className="text-xl">Hãy gửi những phiền muộn của bạn vào đây</p>
          </div>
          {/* <Image
            src="/bg_sendSorrow/bg_init_sendSorrow.png"
            alt="Init image"
            width={440}
            height={530}
          /> */}
        </div>
      )
        : (
          <>
            {!msgMentalHeath?.arrayQuote.length && (
              <div className="absolute right-16 top-1/2 transform px-[14px] py-10 [box-shadow:0px_0px_8px_4px_#FFFFFF40_inset] rounded-full backdrop-filter backdrop-blur -translate-y-1/2 h-[500px] flex flex-col gap-6 overflow-y-auto">
                {LIST_BG.map((item, index) => (
                  <div
                    key={index}
                    className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] cursor-pointer rounded-full bg-cover"
                    style={{ backgroundImage: `url(${item})` }}
                    onClick={() => setSelectedBg(item)}
                  ></div>
                ))}
              </div>
            )}
            <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 max-w-[900px] w-full text-center p-4 rounded-full border [border-color:linear-gradient(180deg,_#FFFFFF_0%,_#999999_100%)] backdrop-filter backdrop-blur-[15px] bg-[#ffffff1c]">
              {msgMentalHeath?.arrayQuote.length ? (
                <div className={`text-[30px] italic font-bold text-[#FFFFFF]`}>
                  {messageIndex >= msgMentalHeath?.arrayQuote.length ? (
                    <div className="w-full">{renderLastMessage()}</div>
                  ) : (
                    msgMentalHeath.arrayQuote?.[messageIndex]
                  )}
                </div>
              ) : (
                <span className="text-[25px] italic font-bold text-[#FFFFFF]">
                  Đặt một muộn phiền của bạn vào đây
                </span>
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className={`h-[250px] w-[250px] rounded-full m-auto bg-[#FFFFFF] border border-[solid] border-[#FFFFFF] [box-shadow:0px_4px_4px_rgba(224,_224,_224,_0.25),_0px_4px_4px_rgba(255,_255,_255,_0.25),_0px_0px_12px_8px_#FFFFFF] ${!!msgMentalHeath?.arrayQuote.length && "shrinking-div"} ${moveUp && "duration-100 move-up"}`}
              >
                <div className="flex justify-center items-center w-[210px] h-[210px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                  <span className=" text-3xl text-center font-bold z-10 text-[#1D3D63]">
                    {!!msgMentalHeath?.arrayQuote.length && message}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 flex justify-center items-center">
              <Input
                onKeyDown={handleKeyPress}
                placeholder="Điều gì đang làm bạn cảm thấy nặng lòng ?"
                onChange={handleMessageChange}
                className={`${!!msgMentalHeath?.arrayQuote.length && "hidden-component"} bg-white rounded-full border-none p-4 pl-4 shadow-md  text-[#000000] font-bold [box-shadow:0px_4px_4px_0px_#00000040] text-xl w-[550px] outline-none`}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`${!!msgMentalHeath?.arrayQuote.length && "hidden-component"} text-center py-3 w-[150px] border-none overflow-hidden fixed top-[88%] left-1/2 transform -translate-x-1/2 bg-[#F5F5FA] [box-shadow:-5px_-5px_10px_rgba(255,_255,_255,_0.5),_5px_5px_10px_rgba(170,_170,_204,_0.25),_10px_10px_20px_rgba(170,_170,_204,_0.5)] rounded-[32px]`}
            >
              <span className="text-[#172048] uppercase font-bold text-xl">
                Gửi
              </span>
            </button>
          </>
        )}

      {stars.map((star: number, index: number) => (
        <Star key={index} removeStar={removeStar} />
      ))}


      <audio className="hidden" ref={audioRef} controls>
        <source
          src={process.env.NEXT_PUBLIC_API_BASE_URL + listSound[Math.floor(Math.random() * listSound.length)].pathPublic}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>

    </div>
  );
}
