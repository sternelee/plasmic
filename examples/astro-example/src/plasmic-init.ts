import { initPlasmicLoader } from "@plasmicapp/loader-astro";

// IMPORTANT: Replace these with your actual Plasmic project credentials
// Get these values from your Plasmic project settings at:
// https://studio.plasmic.app/projects/YOURPROJECTID/settings

// You can also use environment variables with Astro:
// id: import.meta.env.PLASMIC_PROJECT_ID,
// token: import.meta.env.PLASMIC_PROJECT_TOKEN,

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "PLASMIC_PROJECT_ID", // REPLACE THIS
      token: "PLASMIC_PROJECT_TOKEN", // REPLACE THIS
    },
  ],
  preview: false,
});

// You can register code components here
// PLASMIC.registerComponent(MyButton, {
//   name: "MyButton",
//   props: {
//     children: "slot",
//   },
// });
