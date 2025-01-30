export default function manifest() {
  return {
    name: "Journal",
    short_name: "Mood",
    description:
      "Track your thoughts and let Mood Journal uncover insights about your emotions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/Journal-icon.png",
        sizes: "640x640",
        type: "image/png",
      },
    ],
  };
}
