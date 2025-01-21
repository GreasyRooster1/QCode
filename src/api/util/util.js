const isValidUrl = urlString=> {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function getDateString(unixStamp){
    if(unixStamp == null||unixStamp<=0){
        return 'No Date';
    }
    let date = new Date(unixStamp * 1000);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    return month+"/"+day+"/"+year;
}

function timeDifference(previous) {
    if(previous===null||previous===undefined) {
        return "";
    }

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = Date.now()

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

function shortTimeDifference(previous) {
    if(previous===null||previous===undefined) {
        return "";
    }

    previous*=1000;
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = Date.now()

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + 's';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + 'min';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + 'h';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + 'd';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + 'mo';
    }

    else {
        return Math.round(elapsed/msPerYear ) + 'y';
    }
}

export {isValidUrl,timeDifference,shortTimeDifference,getDateString}