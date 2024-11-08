import Image from "next/image";
export default function AboutUs() {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="py-5">
          <p className="text-3xl font-semibold text-[#0F52BA]">
            Đội ngũ của chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10 w-[1150px] h-[700px]">
         
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/haiduong.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Nguyễn Hải Dương
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Technical Leader
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Hạnh phúc không phải là điểm đến, mà là hành trình bạn
                    đang đi.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 border rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/huuduy.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Nguyễn Lê Hữu Duy
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Product manager
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Hãy luôn tin tưởng rằng bạn đủ mạnh mẽ để vượt qua mọi
                    thử thách.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/khacthinh.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Nguyễn Khắc Thịnh
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Media Team Lead
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Mỗi ngày là một cơ hội mới để bắt đầu lại và trở nên
                    tốt hơn.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/kimvu.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Trần Kim Vũ
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Front-end Team Lead
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Đừng sợ thất bại, vì từ đó chúng ta học được những bài
                    học quý giá nhất.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/sonhai.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Cao Sơn Hải
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Back-end Team Lead
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Chăm sóc sức khỏe tinh thần là món quà quý giá nhất
                    bạn có thể tặng cho chính mình.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/thanhcuong.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Nguyễn Thanh Cường
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Front-end Developer
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Hãy yêu thương bản thân và cho phép mình được nghỉ
                    ngơi khi cần.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/thuytrang.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Thùy Trang
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Reasearch Team Lead
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Khi bạn cảm thấy mệt mỏi, hãy nhớ rằng mọi cơn bão rồi
                    cũng sẽ qua đi.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/thuhien.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Thu Hiền
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Researcher
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Sức mạnh thực sự nằm ở việc chấp nhận và yêu thương
                    chính bản thân mình.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#D7EFFF] p-4 rounded-[10px]">
            <div className="flex flex-col">
              <div className="flex relative aspect-video items-center justify-center py-2">
                <Image
                  className="object-contain"
                  width={130}
                  height={50}
                  alt="logo"
                  src={"/thaonhi.svg"}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-[#0F52BA] text-center">
                  Thảo Nhi
                </p>
                <p className="text-base font-semibold text-center py-2">
                  Researcher
                </p>
                <p className="text-center py-5">
                  <em>
                    &quot;Sự thay đổi bắt đầu từ những bước nhỏ bé, đừng ngần
                    ngại tiến lên phía trước.&quot;
                  </em>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center py-2">
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/facebook.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/instagram.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/linkedin.svg"}
                />
                <Image
                  className="object-contain"
                  width={30}
                  height={30}
                  alt="logo"
                  src={"/twitter.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
