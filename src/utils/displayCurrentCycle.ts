export default function displayCurrentCycle(current: number, max : number) : string {
  if(current % 2 === 0) {
    return 'Work time'
  } else if(current !== max) {
    return "Short brake"
  } else {
    return "Long Brake"
  }
}