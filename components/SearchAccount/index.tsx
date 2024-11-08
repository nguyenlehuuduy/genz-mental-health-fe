import { SearchAccountForCard } from "@/service/searchService";
import React from "react";
import AvatarAccount from "../Avata";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchAccount = ({
  listAccounts,
  onItemSelect,
}: {
  listAccounts: SearchAccountForCard[];
  onItemSelect: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col ">
      <p className="py-2 border-b text-base font-bold">Tài khoản</p>
      <div className="w-full max-h-[250px] min-h-[60px] overflow-y-auto">
        {listAccounts.length === 0 ? (
          <p className="flex justify-center py-4">
            Không tìm thấy tài khoản nào
          </p>
        ) : (
          listAccounts.map((account, index) => (
            <div
              key={index}
              className="flex flex-row w-full items-center gap-4 py-2 shadow-sm"
              onClick={onItemSelect}
            >
              <div className="relative w-[40px] h-[40px] rounded-full">
                <AvatarAccount
                  name={account.full_name}
                  filePath={account.avatar}
                  height={40}
                  width={40}
                  key={index}
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/profile/${account.id}`}
                  className="text-base font-semibold"
                >
                  {account.full_name}
                </Link>
                <p className="">{account.nick_name}</p>
                <div className="flex gap-3 text-sm">
                  <p
                    className="text-blue-600 cursor-pointer"
                    onClick={() => router.push(`/profile/${account.id}`)}
                  >
                    Xem tài khoản
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchAccount;
