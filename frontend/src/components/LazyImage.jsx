import { useState, useRef, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

const LazyImage = ({ src, alt, height = "100%", width = "100%" }) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Box ref={imgRef} sx={{ position: "relative", height, width }}>
      {!isLoaded && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {isInView && (
        <img
          loading="lazy"
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
};

export default LazyImage;
