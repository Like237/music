

    var audio = document.querySelector('audio');

    var data = [
        {
            song:'答案',
            singer:'Cover',
            src:'song/daan.mp3'
        },
        {
            song:'椿',
            singer:'沈以诚',
            src:'song/椿.mp3'
        },{
            song:'好想你',
            singer:'李雪莱',
            src:'song/好想你.mp3'
        },{
            song:'五月天',
            singer:'草帽呀',
            src:'song/草帽呀.mp3'
        },{
            song:'成全',
            singer:'Cover',
            src:'song/成全.mp3'
        },{
            song:'你被写在我的歌声里',
            singer:'伯村清唱',
            src:'song/你被写在我的歌声里.mp3'
        }

    ];

    var index = 0;

    function init () {
        $('.song').html(data[index].song);
        $('.singer').html(data[index].singer);
        audio.src = data[index].src;
    }
    init();
    // 播放暂停函数
    // audio.pause是一个布尔值，当音乐正在播放的时候是false
    function play(){
        if(audio.paused){
            audio.play();
            $('#suspend').css('background-position-x','-30px');
        }else{
            audio.pause();
            $('#suspend').css('background-position-x','0px');
        }
    }

    // 播放暂停
    $('#play').click(function(){
        play();
    });

    // 上一曲
    $('.bt-left').click(function(){
        index --;
        index = index < 0 ? data.length - 1 : index;
        init();
        play();
    });

    //下一曲
    $('.bt-right').click(function(){
        index ++;
        index = index > data.length - 1 ? 0 : index;
        init();
        play();
    });

    audio.addEventListener('canplay',function(){
        var totalM = parseInt(audio.duration / 60);
        var totalS = parseInt(audio.duration % 60);
        $('.middle .right').html(formateTime(totalM)+ ':'+formateTime(totalS));

        audio.addEventListener('timeupdate',function(){
            var currentM = parseInt(audio.currentTime / 60);
            var currentS = parseInt(audio.currentTime % 60);
            $('.middle .left').html(formateTime(currentM)+ ':'+formateTime(currentS));
            var position = (audio.currentTime / audio.duration) * $('.process').width();
            $('.front-pro').width(position);
            $('.circle').css('left',position);
            if(audio.ended){
                index ++;
                index = index > data.length - 1 ? 0 : index;
                init();
                play();
            }
        });

        $('.process').click(function(e){
            audio.currentTime =  (e.offsetX / $('.process').width()) * audio.duration;
        })
    });

    function formateTime(time) {
        return time < 10 ? '0'+ time :time
    }