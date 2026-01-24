import { initPlasmicLoader } from "@plasmicapp/loader-astro";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      // Get these values from your Plasmic project settings
      // You can also use environment variables:
      // id: import.meta.env.PLASMIC_PROJECT_ID,
      // token: import.meta.env.PLASMIC_PROJECT_TOKEN,
      id: "PLASMIC_PROJECT_ID", // Replace with your project ID
      token: "PLASMIC_PROJECT_TOKEN", // Replace with your API token
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
