/**
 * AudioManager for RustVenture.
 *
 * BGM:  Real lo-fi hip-hop track (Pixabay, royalty-free) via HTML Audio element.
 *       Only plays when online. No synthesized fallback — offline = silence.
 * SFX:  Warm piano-bell tones synthesized via Web Audio API.
 */

// ─── Lo-Fi Tracks (Pixabay CDN, free to use) ─────────────────────────────────
// Multiple tracks so we can fall back if one fails to load.
const BGM_TRACKS = [
    'https://cdn.pixabay.com/audio/2024/04/17/audio_843f8d2d91.mp3', // Lo-fi chill
    'https://cdn.pixabay.com/audio/2022/10/25/audio_b6dcd4d2e8.mp3', // Lo-fi study
    'https://cdn.pixabay.com/audio/2023/02/07/audio_4929fb4b2f.mp3', // Chill beats
];

class AudioManager {
    constructor() {
        this.ctx = null;
        this.bgm = null;
        this.isMuted = localStorage.getItem('rustquest_muted') === 'true';
        this._bgmStarted = false;
    }

    // ─── Web Audio Context (lazy, SFX only) ──────────────────────────────────

    _getCtx() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
    }

    init() { /* no-op — AudioContext is created on first SFX play */ }

    // ─── Mute Control ─────────────────────────────────────────────────────────

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('rustquest_muted', this.isMuted);

        if (this.bgm) {
            if (this.isMuted) {
                this.bgm.pause();
            } else {
                this.bgm.volume = 0.30;
                this.bgm.play().catch(() => {});
            }
        }

        return this.isMuted;
    }

    // ─── Background Music ─────────────────────────────────────────────────────

    /**
     * Starts the lo-fi BGM.
     * Rules:
     *   • If muted          → skip
     *   • If offline        → skip silently (no synth, no buzz)
     *   • If track fails    → try next; if all fail → stay silent
     */
    async playBGM() {
        if (this._bgmStarted) return;
        this._bgmStarted = true;

        if (this.isMuted) return;

        // No connection → no audio at all (prevents buzzing / error sounds)
        if (!navigator.onLine) return;

        for (const url of BGM_TRACKS) {
            try {
                const audio = new Audio();
                audio.src = url;
                audio.loop = true;
                audio.volume = 0;
                audio.preload = 'auto';

                await new Promise((resolve, reject) => {
                    audio.addEventListener('canplaythrough', resolve, { once: true });
                    audio.addEventListener('error', reject, { once: true });
                    setTimeout(reject, 6000); // give up after 6 s
                });

                this.bgm = audio;
                await audio.play();

                // Fade in over 2 seconds
                this._fadeIn(audio, 0.30, 2000);
                return; // loaded successfully — done
            } catch {
                // Track failed to load or play, try next silently
                continue;
            }
        }

        // All tracks unreachable → stay silent, no fallback
    }

    /**
     * Smooth volume fade-in using small intervals.
     */
    _fadeIn(audio, targetVol, durationMs) {
        const steps = 40;
        const stepTime = durationMs / steps;
        let vol = 0;
        const interval = setInterval(() => {
            if (!this.bgm || this.isMuted) { clearInterval(interval); return; }
            vol = Math.min(vol + targetVol / steps, targetVol);
            audio.volume = vol;
            if (vol >= targetVol) clearInterval(interval);
        }, stepTime);
    }

    stopBGM() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
            this.bgm = null;
        }
        this._bgmStarted = false;
    }

    // ─── Sound Effects (Web Audio API) ───────────────────────────────────────

    playSFX(type) {
        if (this.isMuted) return;
        try {
            if (type === 'correct') this._playTutam();
            if (type === 'success') this._playTada();
        } catch (e) {
            console.warn('[Audio] SFX error:', e);
        }
    }

    /** "Tu-tam" — two-note ascending chime for correct answers */
    _playTutam() {
        const ctx = this._getCtx();
        const bus = ctx.createGain();
        bus.gain.value = 0.55;
        bus.connect(ctx.destination);
        this._bellNote(ctx, bus, 523.25, 0.0,  0.55);  // C5
        this._bellNote(ctx, bus, 659.25, 0.13, 0.60);  // E5
    }

    /** "Ta-da!" — four-note fanfare for level completion */
    _playTada() {
        const ctx = this._getCtx();
        const bus = ctx.createGain();
        bus.gain.value = 0.55;
        bus.connect(ctx.destination);
        [[523.25, 0.00], [659.25, 0.17], [783.99, 0.34], [1046.5, 0.51]]
            .forEach(([freq, offset]) => this._bellNote(ctx, bus, freq, offset, 0.65 - offset * 0.1));
    }

    /** Piano-bell tone: fundamental + 2 harmonics, ADSR envelope */
    _bellNote(ctx, bus, freq, startOffset, duration) {
        const t = ctx.currentTime + startOffset;
        [{ mult: 1, amp: 0.7 }, { mult: 2, amp: 0.2 }, { mult: 3, amp: 0.07 }]
            .forEach(({ mult, amp }) => {
                const osc = ctx.createOscillator();
                const g   = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq * mult;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(amp, t + 0.008);
                g.gain.exponentialRampToValueAtTime(amp * 0.5, t + 0.06);
                g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
                osc.connect(g);
                g.connect(bus);
                osc.start(t);
                osc.stop(t + duration + 0.1);
            });
    }
}

export const audioManager = new AudioManager();
