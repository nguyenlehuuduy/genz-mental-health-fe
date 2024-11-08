import Image from "next/image";
const FooterLanding = () => {
  return (
    <footer className="flex flex-col bg-[#D7EFFF]">
      <div className="w-[95%] flex flex-row py-5 space-x-5 items-center mx-auto">
        <div className="flex w-[50%]  space-x-10 justify-around">
          <div className="flex flex-col px-2  items-start">
            <Image
              className="object-contain"
              width={130}
              height={50}
              alt="logo"
              src={"/logo.svg"}
            />
            <div className="w-[80%] py-5">
             <b>
             <p className="text-[#0F52BA]">
                Bạn đã đến đích nhưng chưa phải là cuối cùng!{" "}
              </p>
              <p className="text-[#0F52BA]">
                {" "}
                Hãy nhớ rằng, bạn không đơn độc. Tiếp cận, tìm kiếm sự hỗ trợ và
                ưu tiên sức khỏe tinh thần của bạn.
              </p>
             </b>
            </div>
          </div>
          <div className="flex flex-col w-[50%]  justify-between">
            <p className="font-bold text-xl">Dịch vụ</p>
            <div className="flex flex-col space-y-2 py-5">
              <a href="#" className="  hover:text-blue-500">
                Sẻ chia
              </a>
              <a href="#" className="   hover:text-blue-500">
                Chữa lành
              </a>
              <a href="#" className="  hover:text-blue-500">
                Thư giãn
              </a>
              <a href="#" className=" hover:text-blue-500">
                Các nhóm hỗ trợ
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-[50%] justify-around">
          <div className="flex flex-col  ">
            <p className="font-bold text-xl">Kết nối</p>
            <div className="space-y-3 py-5">
              <div className="flex flex-row space-x-4">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/icons-system/GreySolidIcon/phone.svg"}
                />
                <p> 03586509**</p>
              </div>
              <div className="flex flex-row space-x-4 ">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/icons-system/GreySolidIcon/mail.svg"}
                />
                <p> genzmentalhealth@gmail.com</p>
              </div>
              <div className="flex flex-row space-x-4">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/icons-system/GreySolidIcon/location.svg"}
                />
                <p> 470 Trần Đại Nghĩa</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-2">
            <p className="font-bold text-xl">Cộng đồng</p>
            <div className="space-y-3 py-5">
              <a href="#" className=" text-center hover:text-blue-500">
                GenZ Mental Health
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-[#0F52BA] " />
      <div className="flex mx-auto py-5 space-x-4">
        <Image
          className="object-contain"
          width={200}
          height={200}
          alt="logo"
          src={"/landingpage/social-media.svg"}
        />
       
      </div>
    </footer>
  );
};
export default FooterLanding;
