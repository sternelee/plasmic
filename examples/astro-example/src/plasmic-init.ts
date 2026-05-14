import { initPlasmicLoader } from "@plasmicapp/loader-astro";

// IMPORTANT: Replace these with your actual Plasmic project credentials
// Get these values from your Plasmic project settings at:
// https://studio.plasmic.app/projects/YOURPROJECTID/settings

// Recommended: Use environment variables with Astro
// Create a .env file and add:
// PLASMIC_PROJECT_ID=your_project_id
// PLASMIC_PROJECT_TOKEN=your_project_token

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: import.meta.env.PLASMIC_PROJECT_ID ?? "YOUR_PROJECT_ID_HERE",
      token: import.meta.env.PLASMIC_PROJECT_TOKEN ?? "YOUR_PROJECT_TOKEN_HERE",
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
