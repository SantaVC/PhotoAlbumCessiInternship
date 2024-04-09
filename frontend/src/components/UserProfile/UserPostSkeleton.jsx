import ContentLoader from "react-content-loader";

const UserPostSkeleton = ({ width = 220, height = 300, speed = 2 }) => {
  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#d9d9d9"
      foregroundColor="#ffffff"
    >
      <rect x="0" y="0" rx="10" ry="10" width={width} height={height} />
    </ContentLoader>
  );
};

export default UserPostSkeleton;
