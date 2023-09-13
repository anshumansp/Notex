import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/";
    }
    //eslint-disable-next-line
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className=" mx-auto flex px-5 pt-32 md:pt-40 lg:pt-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/12 md:w-3/12 sm:w-4/12 w-5/12 mb-10 object-cover object-center rounded"
          alt="logo"
          src="favicon.webp"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900" style={{fontFamily: "math"}}>
            Notex: Your Cloud Based Note Taking Platform 
          </h1>
          <p className="mb-8 leading-relaxed text-lg text-gray-600" style={{fontFamily: "math"}}>
          "Notex revolutionizes note-taking in the digital age. This cloud-based app combines the simplicity of CRUD operations with the power of organization and accessibility. Create, read, update, and delete your notes effortlessly while enjoying the convenience of seamless cloud storage and security. "
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
