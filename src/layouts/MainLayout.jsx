import Header from "./Header";
import { Outlet } from "react-router-dom";
import FixedContact from "../components/FixedContact";

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <main id="container">
        <Outlet />
      </main>
      {/* Main.jsx - > Footer는 직접 렌더링 -> 원스크롤 페이지 이슈 */}
      <FixedContact />
    </div>
  );
}

export default MainLayout;
