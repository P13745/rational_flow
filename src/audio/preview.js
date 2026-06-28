function playSineItems(ctx, items, { level, duration, attack, release }) {
  const startAt = ctx.currentTime + 0.02;
  items.forEach((item) => {
    const itemDelay = item.delay || 0;
    const itemStart = startAt + itemDelay;
    const itemDuration = Math.max(0.05, duration - itemDelay);
    const itemRelease = Math.min(release, itemDuration * 0.45);
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = item.frequency;
    gain.gain.setValueAtTime(0, itemStart);
    gain.gain.linearRampToValueAtTime(level * item.gain, itemStart + attack);
    gain.gain.setValueAtTime(level * item.gain, itemStart + itemDuration - itemRelease);
    gain.gain.linearRampToValueAtTime(0, itemStart + itemDuration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(itemStart);
    oscillator.stop(startAt + duration + 0.03);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  });
}

export function playDiesisPreview(ctx, frequencies, level) {
  const staggeredFrequencies = frequencies.map((item, index) => ({
    ...item,
    delay: index === 0 ? 0 : 0.5,
  }));
  playSineItems(ctx, staggeredFrequencies, {
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
