import formatTime from "lmw-time-format"

export function docAva(ava) {
    if (ava) {
        return ava;
    }
    return "./static/img/doctor.m.png";
}

export function timeFormat(time, format) {
    return formatTime(time, format);
}

export function consultType(type) {
    return {
        PIC: "图文咨询"
    }[type];
}

export function getGender(gender) {
    return gender == "M" ? "男" : "女"
}

export function getAgeFromCard(card) {
    if (!card) {
        return
    }
    let year = card.length == 18 ? card.substr(6, 4) : "19" + card.substr(6, 2);
    return parseInt(timeFormat(new Date().getTime(), "%Y")) - parseInt(year);

}