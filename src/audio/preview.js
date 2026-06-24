function playSineItems(ctx, items, { level, duration, attack, release }) {
  const startAt = ctx.currentTime + 0.02;
  items.forEach((item) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = item.frequency;
    gain.gain.setValueAtTime(0, startAt);
    gain.gain.linearRampToValueAtTime(level * item.gain, startAt + attack);
    gain.gain.setValueAtTime(level * item.gain, startAt + duration - release);
    gain.gain.linearRampToValueAtTime(0, startAt + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.03);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  });
}

export function playDiesisPreview(ctx, frequencies, level) {
  playSineItems(ctx, frequencies, {
    level,
    duration: 2,
    attack: 0.14,
    release: 0.34,
  });
}

export function playFrequencyPreview(ctx, frequency, level) {
  playSineItems(ctx, [{ frequency, gain: 1 }], {
    level,
    duration: 1,
    attack: 0.06,
    release: 0.22,
  });
}
