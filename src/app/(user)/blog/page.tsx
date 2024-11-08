import {
  getHotBlog,
  getListCateBlog,
  getListPostBlog,
} from "@/service/blogService";
import {
  AboutUsAndOurMission,
  AllBlogs,
  HotBlog,
  NewBlogs,
  WelcomeBlog,
  WhyUsStart,
} from "../../../../components";
import { getAllBasicInfoCompany } from "@/service/basicInfoCompany";
import {
  TYPE_INFO_COMPANY_ABOUT_US,
  TYPE_INFO_COMPANY_TARGET,
  TYPE_INFO_COMPANY_WHY_MAKE,
} from "@/lib/constants";

type Param = {
  searchParams: {
    pageNo?: string;
    cateBlogId?: string;
    limit?: string;
    keyword?: string;
    sortBy?: string;
    orderBy?: string;
  };
};
export default async function BlogPage(props: Param) {
  const listPostBlog = await getListPostBlog({ limit: 5 });
  const listBlogs = listPostBlog?.data || [];
  const listCateBlog = await getListCateBlog();
  const hotBlog = await getHotBlog();

  const getDataCompany = async () => {
    const listInfoBasicCompany = await getAllBasicInfoCompany();
    const aboutUs = listInfoBasicCompany?.find(
      (item) => item.type_info_company.id === TYPE_INFO_COMPANY_ABOUT_US,
    );
    const myResponsibility = listInfoBasicCompany?.find(
      (item) => item.type_info_company.id === TYPE_INFO_COMPANY_TARGET,
    );
    const myReason = listInfoBasicCompany?.find(
      (item) => item.type_info_company.id === TYPE_INFO_COMPANY_WHY_MAKE,
    );
    return { aboutUs, myResponsibility, myReason };
  };

  const dataCompany = await getDataCompany();
  return (
    <div className="px-5 py-10 bg-white rounded-md flex flex-col gap-3 max-w-[1240px] mt-1">
      <WelcomeBlog />
      {hotBlog && listBlogs && (
        <div className="flex gap-8">
          {hotBlog && <HotBlog hotBlog={hotBlog} />}
          <NewBlogs listBlogs={listBlogs || []} />
        </div>
      )}
      <AllBlogs
        conditionProps={props.searchParams}
        listCateBlog={listCateBlog ?? []}
      />
      <AboutUsAndOurMission
        aboutUs={dataCompany?.aboutUs!}
        myResponsibility={dataCompany?.myResponsibility!}
      />
      <WhyUsStart myReason={dataCompany.myReason!} />
    </div>
  );
}
