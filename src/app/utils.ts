export const setTime = (time: any) => {
    const now: number = new Date().getTime();
    sessionStorage.setItem('timeExpiration', now + time);
}

export const validateTime = (startTime: number) => {
    const now: number = new Date().getTime();
    const time: any = sessionStorage.getItem('timeExpiration') || 0
    const timeLeft = time - now
    console.log(timeLeft, timeLeft > 0)
    if (timeLeft <= 60000 && timeLeft > 0)
        setTime(startTime)

    return timeLeft > 0 ? true : false
}
