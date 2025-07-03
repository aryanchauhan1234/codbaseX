import { useEffect, useRef } from "react";
import FriendComparison from "../components/FriendComparison";
import AddFreind from "../components/AddFreind";

const FriendPage = () => {
  const comparisonRef = useRef();
 useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToComparison");
    if (shouldScroll === "true") {
      localStorage.removeItem("scrollToComparison");
      setTimeout(() => {
        comparisonRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300); // Wait a bit for layout/render
    }
  }, []);
  return (
    <div>
      <AddFreind comparisonRef={comparisonRef} />
      <div ref={comparisonRef}>
        <FriendComparison />
      </div>
    </div>
  );
};

export default FriendPage;
