export const COLOR_OPTIONS = {
    original: (() => [26, 51, 43, 0.1]),
    light: (() => [26, 20, 100, 0.1]),
    dark: (() => [0, 0, 0, 0.1]),
    colorful: ((frameCount) => [
        frameCount % 255,
        255,
        255,
        0.1,
    ]),
    blue: ((frameCount) => [
        (frameCount % 75) + 180,
        255,
        255,
        0.1,
    ]),
    turqouise: ((frameCount) => [
        (frameCount % 60) + 150,
        255,
        255,
        0.1,
    ]),
    fire: ((frameCount) => [
        (frameCount % 70) + 10,
        255,
        255,
        0.1,
    ]),
};

export default COLOR_OPTIONS;