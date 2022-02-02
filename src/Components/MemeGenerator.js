import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const MemeGenerator = () => {
  const [topText , setTopText] = useState("");
  const [bottomText , setbottomText] = useState("");
  const [allMemeImgs , setallMemeImgs] = useState([]);
  const [randomImg , setrandomImg] = useState("http://i.imgflip.com/1bij.jpg");


  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setallMemeImgs(memes);
      });
  }, []);

  const handleChange1 = (event) => {
    const s = event.target.value;
    setTopText(s);
  }
  const handleChange2 = (event) => {
    const s = event.target.value;
    setbottomText(s);
  }

  const randomMeme = (event) => {
    event.preventDefault();
    var items = allMemeImgs;
    var item = items[Math.floor(Math.random() * items.length)];
    setrandomImg(item.url);
  }

  const capture = () => {
    const divToDisplay = document.getElementById("meme");
    html2canvas(divToDisplay, {
      allowTaint: true,
      useCORS: true,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
    }).then(function (canvas) {
      var url = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = "meme.png";
      link.href = url;
      link.click();
    });
  }
  return (
    <div>
      <form className="meme-form" onSubmit={randomMeme}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange1}
          autocomplete="off" 
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange2}
          autocomplete="off" 
        />

        <button>Change Photo</button>
      </form>
      <div id="meme" className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
      <button id="capture" onClick={capture}>
        Download Meme
      </button>
    </div>
  );
}

export default MemeGenerator;
