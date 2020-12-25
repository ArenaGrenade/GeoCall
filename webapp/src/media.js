// Use both expressions inside setting the state audio variable
export const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
    });
    return audio;
}

export const stopMicrophone = (audio) => {
    audio.getTracks().forEach(track => track.stop());
    return null;
}
