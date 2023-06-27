export function formatDate (currentDate) {

    var dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = currentDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = currentDate.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    var HH = currentDate.getHours();
    if (HH < 10) HH = '0' + HH;

    var MM = currentDate.getMinutes();
    if (MM < 10) MM = '0' + MM;

    return dd + '.' + mm + '.' + yy + " " + HH + ":" + MM;
  }