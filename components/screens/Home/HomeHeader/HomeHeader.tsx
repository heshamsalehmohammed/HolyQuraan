// components/screens/Home/HomeHeader/HomeHeader.tsx
import GeneralHeader from "@/components/common/GeneralHeader";
import HomeHeaderLeftButton from "./HomeHeaderLeftButton";
import HomeHeaderRightButton from "./HomeHeaderRightButton";

interface Props {
  elevated?: boolean;
}

function HomeHeader({ elevated = false }: Props) {
  return (
    <GeneralHeader elevated={elevated}>
      <HomeHeaderLeftButton />
      <HomeHeaderRightButton />
    </GeneralHeader>
  );
}

export default HomeHeader;
