import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import AllCards from "./components/AllCards";
import TvShows from "./components/TvShows";
import Jumbo from "./components/Jumbo";
import NewBlogPost from "./components/BackOffice";
// import Profile from "./components/Profile";

function App() {
  return (
    <div className="body-container">
      <MyNav />
      <Jumbo />
      {/* <Profile /> */}
      <TvShows />
      <AllCards />
      <NewBlogPost />
      <MyFooter />
    </div>
  );
}

export default App;
