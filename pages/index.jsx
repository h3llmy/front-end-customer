import { getLayout } from "../components/layout/layout";

const Home = () => {
  return (
    <div className="h-[89vh]">
      <img
        className="w-full h-full object-cover"
        src="https://media.discordapp.net/attachments/789054414853636096/1107152800389025853/image.png?width=832&height=468"
        alt=""
      />
    </div>
  );
};

Home.getLayout = getLayout;

export default Home;
