
# Project ini tidak wajib untuk dijalankan, tetapi jika Anda ingin menghasilkan file audio ambient secara lokal, Anda dapat menjalankan skrip ini.
import math
import os
import struct
import wave

BASE_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets')
BASE_DIR = os.path.abspath(BASE_DIR)
os.makedirs(BASE_DIR, exist_ok=True)


def write_wave(path, kind):
    sample_rate = 22050
    duration = 6.0
    frames = []

    for i in range(int(sample_rate * duration)):
        t = i / sample_rate

        if kind == 'rain':
            noise = ((hash((i // 7,)) % 2000) - 1000) / 1000.0
            tone = math.sin(2 * math.pi * 120 * t) * 0.10
            value = (noise * 0.6 + tone) * 0.35
        elif kind == 'cafe':
            value = math.sin(2 * math.pi * 180 * t) * 0.12
            value += math.sin(2 * math.pi * 240 * t) * 0.05
            value += math.sin(2 * math.pi * 0.4 * t) * 0.08
        elif kind == 'campfire':
            base_val = math.sin(2 * math.pi * 110 * t) * 0.18
            wobble = math.sin(2 * math.pi * 0.7 * t) * 0.09
            noise = (((i * 37) % 1000) / 1000.0) - 0.5
            value = (base_val + wobble + noise * 0.35) * 0.5
        else:
            raise ValueError(f'Unknown sound kind: {kind}')

        if value > 1:
            value = 1
        if value < -1:
            value = -1

        frames.append(struct.pack('<h', int(value * 32767)))

    with wave.open(path, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(b''.join(frames))


for kind in ['rain', 'cafe', 'campfire']:
    write_wave(os.path.join(BASE_DIR, f'{kind}.wav'), kind)

print('Generated files:')
for name in sorted(os.listdir(BASE_DIR)):
    if name.lower().endswith(('.wav', '.mp3')):
        print(name)
