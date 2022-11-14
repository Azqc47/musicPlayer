const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $(".right-playlist");

const heading = $(".plate-name h2");
const plateImg = $(".img--music img");
const audio = $("#audio");

const playBtn = $(".btn--toggle-play");
const main = $(".main");

const progress = $("#progress");
const nextBtn = $(".btn--next");
const prevBtn = $(".btn--prev");

const randomBtn = $(".btn--random")
console.log(randomBtn);
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom : false,
  songs: [
    {
      name: "Last Time",
      singer: "LUCIANO feat. POP SMOKE",
      path: "./assets/audio/1.mp3",
      image: "./assets/img/1.png",
    },
    {
      name: "C'est La Vie",
      singer: " Mix drill by th drill",
      path: "./assets/audio/2.mp3",
      image: "./assets/img/2.png",
    },
    {
      name: "Không thuộc về",
      singer: "Minh Lý",
      path: "./assets/audio/3.mp3",
      image: "./assets/img/3.png",
    },
    {
      name: "Em đã xa anh",
      singer: "Như Việt x VUX",
      path: "./assets/audio/4.mp3",
      image: "./assets/img/4.png",
    },
    {
      name: "Thời Gian Sẽ Trả Lời",
      singer: "Tiên Cookie feat. JustaTee & BigDaddy",
      path: "./assets/audio/5.mp3",
      image: "./assets/img/5.png",
    },
    {
      name: "Vô Tư",
      singer: "Anh Quân Idol (ft Dinhlong) ",
      path: "./assets/audio/6.mp3",
      image: "./assets/img/6.png",
    },
    {
      name: "Thái Bình Mồ Hôi Rơi",
      singer: "Sơn Tùng MTP",
      path: "./assets/audio/7.mp3",
      image: "./assets/img/7.png",
    },
    {
      name: "Last Christmas Robber",
      singer: "Hưng Hack remix",
      path: "./assets/audio/8.mp3",
      image: "./assets/img/8.png",
    },
    {
      name: "HUSTLANG",
      singer: "Slatt On",
      path: "./assets/audio/9.mp3",
      image: "./assets/img/9.png",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
            <div class="playlist-song"> 
                <div class="song--thumb">
                    <img src="${song.image}" alt="">
                </div>
                <div class="song--body">
                    <h4 class="title">${song.name}</h5>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="song--option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
    });
    $(".right-playlist").innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  /* HANDLE_EVENT */
  handleEvent: function () {
    const _this = this;
    // xu ly dia quay va dung
    const plateImgAnimate = plateImg.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // khi bai hat duoc play
    audio.onplay = function () {
      _this.isPlaying = true;
      main.classList.add("playing");
      plateImgAnimate.play();
    };
    // khi bai hat duoc pause
    audio.onpause = function () {
      _this.isPlaying = false;
      main.classList.remove("playing");
      plateImgAnimate.pause();
    };

    // khi bai hat duoc duoc thay doi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // xu li khi tua nhac
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // khi next song
    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
    };

    //khi prev song
    prevBtn.onclick = function () {
      _this.prevSong();
      audio.play();
    };

    //random btn
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle("active" , _this.isRandom);
    };
  },
  /*  END HANDLE */
  //load nhac
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    audio.src = this.currentSong.path;
    plateImg.src = this.currentSong.image;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length;
    }
    this.loadCurrentSong();
  },

  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    // Tải bài hát đầu tiên vào UI khi ứng dụng chạy
    this.loadCurrentSong();
    //
    this.handleEvent();
    // render playlist
    this.render();
  },
};

app.start();
