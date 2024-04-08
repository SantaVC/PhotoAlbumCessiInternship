import ContentLoader from "react-content-loader";

const UserInfoListSkeleton = () => (
  <ContentLoader
    speed={1}
    width={150}
    height={128}
    viewBox="0 0 150 128"
    backgroundColor="#d9d9d9"
    foregroundColor="#ffffff"
  >
    <rect x="0" y="10" rx="5" ry="5" width="150" height="12" />
    <rect x="0" y="35" rx="5" ry="5" width="120" height="12" />
    <rect x="0" y="60" rx="5" ry="5" width="90" height="12" />
    <rect x="0" y="95" rx="5" ry="5" width="150" height="16" />
  </ContentLoader>
);

export default UserInfoListSkeleton;
