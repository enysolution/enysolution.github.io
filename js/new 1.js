
/*****************
Coded by @bachors
******************/

$(document).ready(function() {
    tweet('bachors');
    instagram('261199158');
    google('100217793741516090316');
    facebook('203532783129859');
    vk('324573775');
    soundcloud('118174461');
    github('bachors');
    youtube('bachorsan');

    $('#setting').click(function() {
        $('#form').toggleClass('show');
    });

    $('#go').click(function() {
        $('#feed').empty();
        tweet(($('#twitter').val() != '' ? $('#twitter').val() : 'bachors'));
        instagram(($('#instagram').val() != '' ? $('#instagram').val() : '261199158'));
        google(($('#google').val() != '' ? $('#google').val() : '100217793741516090316'));
        facebook(($('#facebook').val() != '' ? $('#facebook').val() : '203532783129859'));
        vk(($('#vk').val() != '' ? $('#vk').val() : '324573775'));
        soundcloud(($('#soundcloud').val() != '' ? $('#soundcloud').val() : '118174461'));
        github(($('#github').val() != '' ? $('#github').val() : 'bachors'));
        youtube(($('#youtube').val() != '' ? $('#youtube').val() : 'bachorsan'));
        return false;
    });
});

function tweet(id) {
    $.ajax({
        url: 'http://ibacor.com/api/twitter-stream?screen_name=' + id + '&count=1&k=cb9020c4747f32673915aa1caccf1ecd',
        crossDomain: true,
        dataType: 'json'
    }).done(function(json) {
        var data = json.data[0],
            date = new Date(data.created_at),
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds(),
            poto = '',
            html = '';
        if (data.extended_entities != null || data.extended_entities != undefined) {
            if (data.extended_entities.media != null || data.extended_entities.media != undefined) {
                if (data.extended_entities.media[0].media_url != null || data.extended_entities.media[0].media_url != undefined) {
                    poto += '<img src="' + data.extended_entities.media[0].media_url + '" class="media"/>';
                }
            }
        } else if (data.retweeted_status != null || data.retweeted_status != undefined) {
            if (data.retweeted_status.entities.media != null || data.retweeted_status.entities.media != undefined) {
                if (data.retweeted_status.entities.media[0].media_url != null || data.retweeted_status.entities.media[0].media_url != undefined) {
                    poto += '<img src="' + data.retweeted_status.entities.media[0].media_url + '" class="media"/>';
                }
            }
        }
		var url = {
			link: 'https://twitter.com/',
			tag: 'https://twitter.com/hashtag/'
		}
        html += '<div class="post twitter">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-twitter"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://twitter.com/' + data.user.screen_name + '" target="_blank">@' + data.user.screen_name + '</a>';
        html += '				<a class="date" href="https://twitter.com/' + id + '/status/' + data.id_str + '" target="_blank">' + relative_time(time) + ' ago</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += urltag(data.text, url);
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += poto;
        html += '</div>';
        $('#feed').append(html);
    })
}

function instagram(id) {
    $.ajax({
        url: 'https://api.instagram.com/v1/users/' + id + '/media/recent/?access_token=2227436581.3a81a9f.4e37b9951fb344ffbbd57bac6aa0dca1&count=1',
        crossDomain: true,
        dataType: 'jsonp'
    }).done(function(c) {
        var data = c.data[0],
            date = new Date(parseInt(data.created_time) * 1000),
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds(),
            des = '',
            html = '';
        des += (data.caption == null || data.caption == undefined ? '' : data.caption.text);
		var url = {
			link: 'https://instagram.com/',
			tag: 'https://instagram.com/explore/tags/'
		}
        html += '<div class="post instagram">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-instagram"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="http://instagram.com/' + data.caption.from.username + '" target="_blank">@' + data.caption.from.username + '</a>';
        html += '				<a class="date" href="' + data.link + '" target="_blank">' + relative_time(time) + ' ago</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += urltag(des, url);
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += '	<img src="' + data.images.standard_resolution.url + '" class="media"/>';
        html += '</div>';
        $('#feed').append(html);
    });
}

function google(id) {
    $.ajax({
        url: 'https://www.googleapis.com/plus/v1/people/' + id + '/activities/public?key=AIzaSyCj2GrDSBy6ISeGg3aWUM4mn3izlA1wgt0',
        crossDomain: true,
        dataType: 'jsonp'
    }).done(function(json) {
        var data = json.items[0],
            poto = '',
            title = '',
            html = '';
        if (data.object.attachments != '' && data.object.attachments != null && data.object.attachments != undefined) {
            if (data.object.attachments[0].objectType == 'video' && data.object.attachments[0].embed != null) {
                poto += '<iframe src="' + data.object.attachments[0].embed.url + '" class="media"></iframe>';
            } else if (data.object.attachments[0].objectType == 'photo') {
                poto += '<img src="' + data.object.attachments[0].fullImage.url + '" class="media"/>';
            } else if (data.object.attachments[0].objectType == 'article') {
                if (data.object.attachments[0].fullImage != null && data.object.attachments[0].fullImage != undefined) {
                    poto += '<img src="' + data.object.attachments[0].fullImage.url + '" class="media"/>';
                } else if (data.object.attachments[0].image != null && data.object.attachments[0].image != undefined) {
                    poto += '<img src="' + data.object.attachments[0].image.url + '" class="media"/>';
                }
            }
        }
        if (data.object.attachments != null && data.object.attachments[0].objectType == 'article') {
            title += data.object.attachments[0].url;
        }
        html += '<div class="post google">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-google-plus-official"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://plus.google.com/' + data.actor.id + '" target="_blank">' + data.actor.displayName + '</a>';
        html += '				<a class="date" href="' + data.url + '" target="_blank">' + relative_time(data.published) + ' ago</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += data.object.content;
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += poto;
        html += '</div>';
        $('#feed').append(html);
    });
}

function facebook(id) {
    $.ajax({
        url: 'https://graph.facebook.com/v2.2/' + id + '/feed?limit=1&access_token=443213172472393|l2IEt1tuyYta_278fR5NAg8V1jI',
        crossDomain: true,
        dataType: 'json'
    }).done(function(json) {
        var data = json.data[0],
            poto = '',
            html = '';
        if (data.picture != null && data.picture != undefined) {
            poto += '<img src="https://graph.facebook.com/' + data.object_id + '/picture" class="media">'
        }
		var url = {
			link: 'https://facebook.com/',
			tag: 'https://facebook.com/hashtag/'
		}
        html += '<div class="post facebook">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-facebook-official"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://facebook.com/' + data.from.id + '" target="_blank">' + data.from.name + '</a>';
        html += '				<a class="date" href="' + data.link + '" target="_blank">' + relative_time(data.created_time) + ' ago</a>';
        html += '			</div>';
        if (data.message != null && data.message != undefined) {
            html += '			<div class="bottom">';
            html += urltag(data.message, url);
            html += '			</div>';
        }
        html += '		</div>';
        html += '	</div>';
        html += poto;
        html += '</div>';
        $('#feed').append(html);
    });
}

function vk(id) {
    $.ajax({
        url: 'https://api.vk.com/method/wall.get?owner_id=' + id + '&filter=all&count=1',
        crossDomain: true,
        dataType: 'jsonp'
    }).done(function(json) {
        var data = json.response[1],
            date = new Date(parseInt(data.date) * 1000),
            time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds(),
            poto = '',
            html = '';
        if (data.attachment != null && data.attachment != undefined) {
            if (data.attachment.type == 'photo') {
                poto += '<img src="' + data.attachment.photo.src_big + '" class="media">'
            }
        }
		var url = {
			link: 'https://vk.com/',
			tag: 'https://vk.com/feed?section=search&q=%23'
		}
        html += '<div class="post vk">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-vk"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://vk.com/id' + data.from_id + '" target="_blank"></a>';
        html += '				<a class="date" href="https://vk.com/wall' + data.from_id + '_' + data.id + '" target="_blank">' + relative_time(time) + ' ago</a>';
        html += '			</div>';
        if (data.text != null && data.text != undefined) {
            html += '			<div class="bottom">';
            html += urltag(data.text, url);
            html += '			</div>';
        }
        html += '		</div>';
        html += '	</div>';
        html += poto;
        html += '</div>';
        $('#feed').append(html);
        _vk('324573775');
    });
}

function soundcloud(id) {
    $.ajax({
        url: 'https://api.soundcloud.com/tracks?user_id=' + id + '&format=json&client_id=158d3e1ba760d77b323fdf7a79b77730',
        crossDomain: true,
        dataType: 'json'
    }).done(function(json) {
        var data = json[0],
            html = '';
		var url = {
			link: 'https://vk.com/',
			tag: 'https://vk.com/feed?section=search&q=%23'
		}
        html += '<div class="post soundcloud">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-soundcloud"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://soundcloud.com/' + data.user.permalink + '" target="_blank">@' + data.user.permalink + '</a>';
        html += '				<a class="date" href="' + data.permalink_url + '" target="_blank">' + relative_time(data.created_at) + ' ago</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += data.title + (data.description != null && data.description != undefined && data.description != '' ? ' - ' + urltag(data.description, url) : '');
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += '<iframe class="media" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + data.id + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
        html += '</div>';
        $('#feed').append(html);
    });
}

function github(id) {
    $.ajax({
        url: 'https://api.github.com/users/' + id + '/events',
        crossDomain: true,
        dataType: 'json'
    }).done(function(json) {
        var data = json[0],
            comit = '',
            html = '';
        if (data.type == "WatchEvent") {
            comit += data.payload.action + ' <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
        } else if (data.type == "ForkEvent") {
            comit += 'forked <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a> to <a href="https://github.com/' + data.payload.forkee.full_name + '" target="_blank">' + data.payload.forkee.full_name + '</a>';
        } else if (data.type == "ReleaseEvent") {
            comit += 'released <a href="https://github.com/' + data.repo.name + '/release/tag/' + data.payload.release.tag_name + '" target="_blank">' + data.payload.release.tag_name + '</a> at <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
        } else if (data.type == "IssueCommentEvent") {
            comit += 'commented on issue <a href="' + data.payload.issue.html_url + '" target="_blank">' + data.repo.name + '#' + data.payload.issue.number + '</a><br>' + data.payload.comment.body;
        } else if (data.type == "IssuesEvent") {
            var b = "";
            if (data.payload.action == "closed") {
                b += "closed issue"
            } else if (data.payload.action == "opened") {
                b += "opened issue"
            }
            comit += b + ' <a href="' + data.payload.issue.html_url + '" target="_blank">' + data.repo.name + '#' + data.payload.issue.number + '</a><br>' + data.payload.issue.title;
        } else if (data.type == "PushEvent") {
            var rep = "";
            if (data.payload.ref.substring(0, 11) === 'refs/heads/') {
                rep = data.payload.ref.substring(11);
            } else {
                rep = data.payload.ref;
            }
            comit += 'pushed to <a href="https://github.com/' + data.repo.name + '/tree/' + data.payload.ref + '" target="_blank">' + rep + '</a> at <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
        } else if (data.type == "CreateEvent") {
            if (data.payload.ref_type == "branch") {
                comit += 'created branch <a href="https://github.com/' + data.repo.name + '/tree/' + data.payload.ref + '" target="_blank">' + data.payload.ref + '</a> at <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
            } else if (data.payload.ref_type == "repository") {
                comit += 'created repository <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
            } else if (data.payload.ref_type == "tag") {
                comit += 'created tag <a href="https://github.com/' + data.repo.name + '/tree/' + data.payload.ref + '" target="_blank">' + data.payload.ref + '</a> at <a href="https://github.com/' + data.repo.name + '" target="_blank">' + data.repo.name + '</a>';
            }
        }
        html += '<div class="post github">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-github"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://github.com/' + id + '" target="_blank">@' + id + '</a>';
        html += '				<a class="date" href="https://github.com/' + id + '" target="_blank">' + relative_time(data.created_at) + ' ago</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += comit;
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        $('#feed').append(html);
    })
}

function youtube(id) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=' + id + '&key=AIzaSyCj2GrDSBy6ISeGg3aWUM4mn3izlA1wgt0',
        crossDomain: true,
        dataType: 'json'
    }).done(function(a) {
        var b = a.items[0].contentDetails.relatedPlaylists.uploads;
        _youtube(b)
    })
}

function _vk(id) {
    $.ajax({
        url: 'https://api.vk.com/method/users.get?name_case=nom&user_ids=' + id,
        crossDomain: true,
        dataType: 'jsonp'
    }).done(function(data) {
        $('.post.vk .user').html(data.response[0].first_name + ' ' + data.response[0].last_name);
    });
}

function _youtube(b) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=' + b + '&key=AIzaSyCj2GrDSBy6ISeGg3aWUM4mn3izlA1wgt0',
        dataType: 'json'
    }).done(function(json) {
        var data = json.items[0],
            html = '';
        html += '<div class="post youtube">';
        html += '	<div class="content">';
        html += '		<div class="left">';
        html += '			<i class="fa fa-youtube"></i>';
        html += '		</div>';
        html += '		<div class="right">';
        html += '			<div class="top">';
        html += '				<a class="user" href="https://twitter.com/" target="_blank">' + data.snippet.channelTitle + '</a>';
        html += '				<a class="date" href="https://vk.com/wall">' + _timeSince(new Date(data.snippet.publishedAt).getTime()) + '</a>';
        html += '			</div>';
        html += '			<div class="bottom">';
        html += data.snippet.title;
        html += '			</div>';
        html += '		</div>';
        html += '	</div>';
        html += '<iframe src="https://www.youtube.com/embed/' + data.snippet.resourceId.videoId + '" class="media"></iframe>';
        html += '</div>';
        $('#feed').append(html);
    })
}

function relative_time(a) {
    if (!a) {
        return
    }
    a = $.trim(a);
    a = a.replace(/\.\d\d\d+/, "");
    a = a.replace(/-/, "/").replace(/-/, "/");
    a = a.replace(/T/, " ").replace(/Z/, " UTC");
    a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
    var b = new Date(a);
    var c = (arguments.length > 1) ? arguments[1] : new Date();
    var d = parseInt((c.getTime() - b) / 1000);
    d = (d < 2) ? 2 : d;
    var r = '';
    if (d < 60) {
        r = 'jst now'
    } else if (d < 120) {
        r = 'a min'
    } else if (d < (45 * 60)) {
        r = (parseInt(d / 60, 10)).toString() + ' min'
    } else if (d < (2 * 60 * 60)) {
        r = 'an hr'
    } else if (d < (24 * 60 * 60)) {
        r = (parseInt(d / 3600, 10)).toString() + ' hrs'
    } else if (d < (48 * 60 * 60)) {
        r = 'a day'
    } else {
        dd = (parseInt(d / 86400, 10)).toString();
        if (dd <= 30) {
            r = dd + ' dys'
        } else {
            mm = (parseInt(dd / 30, 10)).toString();
            if (mm <= 12) {
                r = mm + ' mon'
            } else {
                r = (parseInt(mm / 12, 10)).toString() + ' yrs'
            }
        }
    }
    return r
}

function _timeSince(a) {
    var s = Math.floor((new Date() - a) / 1000),
        i = Math.floor(s / 31536000);
    if (i > 1) {
        return i + " yrs ago"
    }
    i = Math.floor(s / 2592000);
    if (i > 1) {
        return i + " mon ago"
    }
    i = Math.floor(s / 86400);
    if (i > 1) {
        return i + " dys ago"
    }
    i = Math.floor(s / 3600);
    if (i > 1) {
        return i + " hrs ago"
    }
    i = Math.floor(s / 60);
    if (i > 1) {
        return i + " min ago"
    }
    return Math.floor(s) + " sec ago"
}

function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '')
            .toLowerCase()
            .match(/<[a-z][a-z0-9]*>/g) || [])
        .join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '')
        .replace(tags, function($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
}

function urltag(d, u, e) {
    var f = {
        link: {
            regex: /((^|)(https|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            template: "<a href='$1' target='_BLANK'>$1</a>"
        },
        etdag: {
            regex: /(^|\s)@(\w+)/g,
            template: '$1<a href="' + u.link + '$2" target="_blank">@$2</a>'
        },
        hash: {
            regex: /(^|)#(\w+)/g,
            template: '$1<a href="' + u.tag + '$2" target="_blank">#$2</a>'
        }
    };
    var g = $.extend(f, e);
    $.each(g, function(a, b) {
        d = d.replace(b.regex, b.template)
    });
    return d
}