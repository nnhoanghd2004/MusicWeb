const playlist = [
    {
        name: "ĐÔNG VÀ ANH",
        author: "THÁI ĐINH",
        path: "./mp3/DongVaAnh.mp3",
        img: "./img/DongVaAnh.webp"
    },
    {
        name: "HOA DẠI",
        author: "MAI KHÔi",
        path: "./mp3/HoaDai.mp3",
        img: "./img/HoaDai.webp"
    },
    {
        name: "EM KHÔNG ĐƯỢC PHÉP BUỒN RẦU",
        author: "KIS",
        path: "./mp3/EmKhongDuocPhepBuonRau.mp3",
        img: "./img/EmKhongDuocPhepBuonRau.webp"
    },
    {
        name: "Cuối Tuần",
        author: "Nguyên Hà",
        path: "./mp3/CuoiTuan.mp3",
        img: "./img/CuoiTuan.webp"
    },
    {
        name: "THƯ CHO ANH",
        author: "TRANG",
        path: "./mp3/ThuChoAnh.mp3",
        img: "./img/ThuChoAnh.webp"
    },
    {
        name: "Là Từ Lúc",
        author: "Nguyên Minh Xuân Ái",
        path: "./mp3/LaTuLuc.mp3",
        img: "./img/LaTuLuc.webp"
    },
    {
        name: "Người Đứng Sau Hạnh Phúc",
        author: "Bằng Kiều ft Beckam Nguyễn",
        path: "./mp3/NguoiDungSauHanhPhuc.mp3",
        img: "./img/NguoiDungSauHanhPhuc.webp"
    },
    {
        name: "Cuộc Gọi Đêm",
        author: "Tố Quyên",
        path: "./mp3/CuocGoiDem.mp3",
        img: "./img/CuocGoiDem.webp"
    }
]

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);


//Controll
var player = $('.player')
var pauser = $('.pauser')
var nexter = $('.nexter')
var backer = $('.backer')
var replayer = $('.replayer')
var randomer = $('.randomer')
var audio = $('#audio')
// Wrap
var wrapInfo = $('.wrap-info')
var wrapImg = $('.wrap-img')
var wrapIcon = $('.wrap-icon')


var listMusic =$('.list__music')
var progress = $('#progress')


var app = {
    start: function() {
        this.renderSong(this.indexCurrentSong)
        this.handleEvents()
    },
    isPlaying: false,
    isRandom: false,
    isReplay: false,
    indexCurrentSong: 0,
    handleEvents: function() {

        var controlRotateCD = $('.wrap-img').animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        controlRotateCD.pause()


        wrapIcon.onclick = function() {
            if (app.isPlaying) {
                app.isPlaying = false
                audio.pause();
            } else {
                app.isPlaying = true
                audio.play();
            }
        }

        audio.onplay = function() {
            player.classList.remove('append')
            pauser.classList.add('append')
            controlRotateCD.play();
        }

        audio.onpause = function() {
            player.classList.add('append')
            pauser.classList.remove('append')
            controlRotateCD.pause();
        }

        nexter.onclick = function() {
            if (app.isRandom) {
                var indexRandom 
                do {
                    indexRandom = Math.floor(Math.random() * (playlist.length))
                } while (indexRandom == app.indexCurrentSong)
                app.indexCurrentSong = indexRandom
                app.renderSong(app.indexCurrentSong)
                audio.play();
                isPlaying = true;

            } else {
                if (app.indexCurrentSong < playlist.length-1) {
                    app.indexCurrentSong++
                    app.renderSong(app.indexCurrentSong)
                    audio.play();
                    isPlaying = true;
                } else {
                    app.indexCurrentSong = 0
                    app.renderSong(app.indexCurrentSong)
                    audio.play();
                    isPlaying = true;
                }
            }
            app.isPlaying = true
            player.classList.remove('append')
            pauser.classList.add('append')
            audio.play();
        }

        backer.onclick = function() {
            if (app.isRandom) {
                // Random song
                var indexRandom 
                do {
                    indexRandom = Math.floor(Math.random() * (playlist.length))
                } while (indexRandom == app.indexCurrentSong)
                app.indexCurrentSong = indexRandom
                app.renderSong(app.indexCurrentSong)
                audio.play();
                isPlaying = true;

            } else {
                // Next song
                if (app.indexCurrentSong > 0) {
                    app.indexCurrentSong--
                    app.renderSong(app.indexCurrentSong)
                    audio.play();
                    isPlaying = true;
                } else {
    
                    app.indexCurrentSong = playlist.length-1
                    app.renderSong(app.indexCurrentSong)
                    audio.play();
                    isPlaying = true;
                }
            }
            // Alway play when click
            app.isPlaying = true
            player.classList.remove('append')
            pauser.classList.add('append')
            audio.play();
        }

        replayer.onclick = function() {
            app.isRandom = false
            randomer.classList.remove("active-btn")

            app.isReplay = !app.isReplay
            if (app.isReplay) replayer.classList.add('active-btn')
            else replayer.classList.remove('active-btn')
        }

        randomer.onclick = function() {
            app.isRandom = !app.isRandom
            app.isReplay = false
            replayer.classList.remove("active-btn")

            if (app.isRandom) randomer.classList.add('active-btn')
            else randomer.classList.remove('active-btn')
        }

        listMusic.onclick = function(e) {
            var listActive = e.target.closest('.list__music-item:not(.active-list)')
            if (listActive) {
                app.renderSong(Number(listActive.getAttribute("index")))
                audio.play()
            }
        }


        // Audio timeline, ended
        audio.ontimeupdate = function() {
            progress.value = audio.currentTime/audio.duration*100
        }

        progress.onchange = function() {
            audio.currentTime = progress.value/100*audio.duration
        }

        audio.onended = function() {
            if (app.isReplay) {
                audio.load()
                audio.play()
            } else nexter.click()
        }
    },
    renderSong: function(i) {
        this.indexCurrentSong = i
        $('.wrap-img').innerHTML = `
            <img class="img" src=".${playlist[i].img}" alt="" >
        `

        $('.title').innerHTML = `
                <span class="song">${playlist[i].name}</span>
                <span class="name">${playlist[i].author}</span>
        `
        audio.src = playlist[i].path;
        var text = ''

        listMusic.innerHTML = playlist.reduce(function(a, b, index) {
            if (index == i) text = 'active-list'
            else text = ''
            return a.concat(`
                <li class="list__music-item ${text}" index=${index}>
                    <div class="wrap-item">
                        <img class="item-img" src="${b.img}" alt="" >
                        <div class="item-title">
                            <span class="item-song">${b.name}</span>
                            <span class="item-name">${b.author}</span>
                        </div>
                        <i class="item-icon fa-solid fa-play"></i>
                    </div>
                </li>
            `);
        }, []).join('')
        
        app.scrollItem()
    },
    scrollItem: function() {
        var song = document.querySelector('.active-list')
        setTimeout(() => {
            song.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            })
        }, 200);
    }


}

app.start();