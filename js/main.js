$(function () {
    var $signOfAction = $('.accept i'); //Action icon
    var $span = $('.accept span');
    var $block = $('div').find('[data-state]'); //Search 'div' attribute
    $('.menu__item a').on('click', function (e) { //Click menu
        e.preventDefault();
        $block.attr('data-state', 'off').animate({ //Attribute block's is 'off'
            opacity: 0
        }, 250);

        var $attr = $(this).attr('id');
        if ($attr == 'text') { //Text input   
            $('.textbox').attr('data-state', 'on').animate({
                opacity: 1
            }, 400);

        } else if ($attr == 'archive') { //Archive
            $('.archivebox').attr('data-state', 'on').animate({
                opacity: 1
            }, 400);
            checkNote();
        }
        //  else if ($attr == 'audio') { //Audio input
        //     $('.audiobox').attr('data-state', 'on').animate({
        //         opacity: 1
        //     }, 400);

    });

    $('.textbox a').on('click', function (e) {
        e.preventDefault();
        var $value = $('#name__note').val();
        if ($value.length == 0) { //if input is empty
            $('#name__note').css({
                "box-shadow": "0 0 10px 5px rgb(255, 0, 0)"
            });
            $('#name__note').on('click', function () {
                $(this).css({
                    "box-shadow": "none"
                });
            });
        } else {
            var date = new Date(); //create date
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var time = [day, month, hours, minutes]; //array date
            var nowTime = []; //new array date
            time.forEach(function (item) { //enumeration date array
                if (item < 10) {
                    item = '0' + item;
                    nowTime.push(item);
                } else {
                    nowTime.push(item);
                }
                return nowTime;
            });
            var dateAdded = 'Added ' + nowTime[0] + '.' + nowTime[1] + '.' + year + ' to ' +
                nowTime[2] + ':' + nowTime[3]; //date

            $('#note').append('<li class="note__item"><span class="note__value">' + $value + '</span>' +
                '<div id="date"><span class="note__date">' + dateAdded + '</span></div>' +
                '<i id="delete" class="fas fa-times"></i>' + '</li>');
            $('#name__note').val('');
            $signOfAction.attr('class', 'fas fa-check');
            $span.text('Accept!');
            $('.accept')
                        .fadeIn()
                        .delay(2000)
                        .fadeOut();
        }
    });

    $('body').on('click', '#delete', function () { //Delete note
        $(this).parent().animate({
            right: "50%",
            opacity: 0
        }, 400, function () {
            $(this).remove();
            checkNote();
        });
        $signOfAction.attr('class', 'fas fa-check');
        $span.text('Delete!');
        $('.accept')
                    .fadeIn()
                    .delay(2000)
                    .fadeOut();
    });
    //Audio
    
    // $('#record').on('click', function (e) { //microphone
    //     e.preventDefault();
    //     var $id = $(this).find('i');
    //     if ($id.attr('class') == 'fas fa-microphone'){  
    //         $id.attr('class', 'fas fa-stop');
    //     } else{
    //         $id.attr('class', 'fas fa-microphone');
    //     }
    // });

    function checkNote() { //check item availability
        var checkText = $('li').is('.note__item');
        if (checkText == false) {
            $('div .not__found').show();
        } else {
            $('div .not__found').hide();
        }
    }
});
