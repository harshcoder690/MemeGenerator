import React, { Component } from "react";
import html2canvas from "html2canvas";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.randomMeme = this.randomMeme.bind(this);
    this.capture = this.capture.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  randomMeme(event) {
    event.preventDefault();
    var items = this.state.allMemeImgs;
    var item = items[Math.floor(Math.random() * items.length)];

    this.setState({ randomImg: item.url });
  }

  capture() {
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
      console.log(link);
      link.click();
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.randomMeme}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>Change Photo</button>
        </form>
        <div id="meme" className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
        <button id="capture" onClick={this.capture}>
          Download Meme
        </button>
      </div>
    );
  }
}

export default MemeGenerator;
