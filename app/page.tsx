import Card from "./components/Card";
import Container from "./components/Container";
import { SiTicktick } from "react-icons/si";
import { RiCloseCircleLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from "./components/Button";

export default function Home() {
  return (
    <main>
      <Container>
        <form action="" className="flex gap-4">
          <input
            type="text"
            className="border rounded w-full h-11 mb-10 placeholder:pl-4"
            placeholder="Add To Sopping List"
          />
          <Button type="submit">
            <MdFormatListBulletedAdd className="w-6 h-6 text-white" />
          </Button>
        </form>

        <div className="flex flex-col gap-4 overflow-auto justify-between max-h-[500px]">
          <Card
            classes={{
              card: "flex items-center justify-between w-full h-20 border rounded",
            }}
          >
            <span>Banana</span>

            <div className="flex items-center gap-4">
              <RiCloseCircleLine className="w-6 h-6 text-red-500" />
              <SiTicktick className="w-5 h-5 text-green-500" />
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
