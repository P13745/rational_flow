export function fillEditorPlaybackQueue({
  editor,
  now,
  scheduleAudio,
  settings,
  lookahead = 1.25,
}) {
  if (!editor.isLooping || editor.loopStartWallTime === null) return;
  const loopLength = Math.max(0.1, editor.loopLength);
  const earliestCycle = Math.floor((now - editor.loopStartWallTime) / loopLength) - 1;
  const latestCycle = Math.ceil((now + lookahead - editor.loopStartWallTime) / loopLength) + 1;

  editor.playbackNotes = editor.playbackNotes.filter((note) => {
    const keep = note.start + note.duration >= now - 0.5;
    if (!keep) editor.scheduledEvents.delete(note.scheduleKey);
    return keep;
  });

  for (let cycle = earliestCycle; cycle <= latestCycle; cycle += 1) {
    editor.notes.forEach((note) => {
      if (note.muted) return;
      const start = editor.loopStartWallTime + cycle * loopLength + note.start;
      const end = start + note.duration;
      if (end <= now - 0.02 || start >= now + lookahead) return;
      const scheduleKey = `${note.id}:${cycle}`;
      if (editor.scheduledEvents.has(scheduleKey)) return;
      const transientNote = {
        ...note,
        id: scheduleKey,
        start,
        duration: Math.min(note.duration, loopLength),
        volume: Math.min(settings.volume, note.volume || settings.volume),
        nodes: null,
        scheduleKey,
      };
      editor.scheduledEvents.add(scheduleKey);
      editor.playbackNotes.push(transientNote);
      scheduleAudio(transientNote);
    });
  }
}

export function stopEditorScheduledAudio({ editor, stopNode }) {
  editor.playbackNotes.forEach((note) => stopNode(note, 0.24));
  editor.playbackNotes = [];
  editor.scheduledEvents.clear();
}
