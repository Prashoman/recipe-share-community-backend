



const timeToConvertHours = (startTime:string,endTime:string) => {
    const hour1 = Number(startTime.split(':')[0]);
    const hour2 = Number(endTime.split(':')[0]);
    const min1 = Number(startTime.split(':')[1]);
    const min2 = Number( endTime.split(':')[1]);
    var diff_hour = hour2 - hour1;
    var diff_min = min2 - min1;
    if (diff_hour<0) {
        diff_hour+= 24;
    }
    if (diff_min<0) {
        diff_min+=60;
        diff_hour--;
    } else if(diff_min>=60){
        diff_min-=60;
        diff_hour++;
    }
    const calculateTime = diff_hour+"."+diff_min;
    return calculateTime;
}

export default timeToConvertHours;