interface BasicInfo {
   name: string;
   description: string;
   featured_image: string;
   project_url: string;
   tags: {
      level?: string[];
      "based-on": string[];
      language: string[];
      other?: string[];
   };
}

interface Website {
   type: "website";
   website_link?: string[];
   git_link: string[];
   commits: string[];
   features: string[];
   tech_stack: { [key: string]: string[] };
   most_used_packages: string[];
   images: [string[]];
}

interface Package {
   type: "package";
   npm_link: string[];
   git_link: string[];
   commits: string[];
   features: string[];
   images: [string[]];
}

interface Utility {
   type: "utility";
   git_link: string[];
   commits: string[];
   features: string[];
   tech_stack: { [key: string]: string[] };
   most_used_packages: string[];
   images: [string[]];
}

interface BasicInput {
   name: string;
   placeholder?: string;
}

interface NumberInput {
   type: "number";
   min?: number;
   max?: number;
   step?: number;
}

export type InputType = BasicInput & NumberInput;

interface Model {
   type: "model";
   feature_description: { [key: string]: string };
   ipynb_json: string;
   dataset: string;
   git_link: string[];
   most_used_packages: string[];
   inputs?: InputType[];
   examples: {
      [key: string]: number | string;
   }[];
}

interface Analysis {
   type: "analysis";
   feature_description: { [key: string]: string };
   ipynb_json: string;
   dataset: string;
   git_link: string[];
   most_used_packages: string[];
}

export type Project = BasicInfo &
   (Website | Package | Utility | Model | Analysis);
