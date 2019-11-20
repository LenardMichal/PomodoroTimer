// Function that changes number to string and add zero to look like on real timer.
function addZeroToNumber (number: any) {
  if (number < 10) {
    return '0' + String(number); 
  } else {
    return String(number);
  } 
}


/** function parses miliseconds to seconds minutes hours */
export default function parseTime(milis: number) {

  let allSeconds = Math.abs(Math.floor(milis / 1000));
  let seconds = addZeroToNumber(allSeconds % 60);
  let allMinutes = Math.abs(Math.floor(allSeconds / 60));
  let minutes = addZeroToNumber(allMinutes % 60);
  let allHours = Math.abs(Math.floor(allMinutes / 60));
  let hours = addZeroToNumber(allHours % 60);

  return {hours, minutes, seconds};
}


