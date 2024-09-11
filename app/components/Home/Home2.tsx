import Image from "next/image";
import myImg from "../../../public/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiCodeship } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";

function Home2() {
  return (
    <section className=" bg-[#0B0A21] py-16" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 lg:w-3/4 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold">
              LET ME <span className="text-purple-600">INTRODUCE</span> MYSELF
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              I am building the future by designating and modifying the code of
              life.👨🏻‍💻🧫
              <br />
              <br />I am a Full Stack Developer including{" "}
              <i>
                <b className="text-purple-600">
                  RoR, JavaScript and Python as well as Kotlin and Swift.
                </b>
              </i>
              <br />
              <br />
              My field of Interests is building new &nbsp;
              <i>
                <b className="text-purple-600">Technologies and Products</b>
              </i>{" "}
              and also in areas related to{" "}
              <b className="text-purple-600">
                Deep Learning and Natural Language Processing.
              </b>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="text-purple-600">Node.js</b> and{" "}
              <i>
                <b className="text-purple-600">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>{" "}
              &nbsp; like{" "}
              <i>
                <b className="text-purple-600">React.js and Next.js</b>
              </i>
            </p>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/4 flex items-center justify-center">
            <Tilt>
              <Image
                src={myImg}
                alt="avatar"
                width={192} // Adjust width as needed
                height={192} // Adjust height as needed
                className="rounded-full object-cover"
              />
            </Tilt>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h1 className="text-2xl font-bold">FIND ME ON</h1>
          <p className="mt-2">
            Feel free to <span className="text-purple-600">connect </span>with
            me
          </p>

          <ul className="flex justify-center space-x-6 mt-6">
            <li>
              <a
                href="https://twitter.com/iMartinDav"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <RiTwitterXLine className="text-3xl" />
              </a>
            </li>

            <li>
              <a
                href="https://github.com/iMartinDav"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillGithub className="text-3xl" />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/imartindav/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillLinkedin className="text-3xl" />
              </a>
            </li>

            <li>
              <a
                href="https://opensea.io/iMartinDav"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <SiCodeship className="text-3xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Home2;
