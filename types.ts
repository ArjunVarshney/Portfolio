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
   images: [string];
}

interface Package {
   type: "package";
   npm_link: string[];
   git_link: string[];
   commits: string[];
   features: string[];
   images: [string];
}

interface Utility {
   type: "utility";
   git_link: string[];
   commits: string[];
   features: string[];
   tech_stack: { [key: string]: string[] };
   most_used_packages: string[];
   images: [string];
}

interface BasicInput {
   name: string;
   default?: string | number | boolean | string[];
   placeholder?: string;
   required?: boolean;
}

interface ColorInput {
   type: "color";
}

interface UrlInput {
   type: "url";
}

interface TextAreaInput {
   type: "textarea";
}

interface CheckboxInput {
   type: "checkbox";
}

interface TextArrayInput {
   type: "text-array";
}

interface SliderInput {
   type: "slider";
   min?: number;
   max?: number;
   step?: number;
}

interface TextInput {
   type: "text";
}

interface NumberInput {
   type: "number";
}

interface InputGroup {
   type: "inputs";
   inputs: InputType[];
}

interface SelectInput {
   type: "select";
   values: string[];
}

interface RadioInput {
   type: "radio";
   values: string[];
}

interface ConditionalInput {
   type: "conditional-input";
   name: "NA";
   switch: string;
   inputs: { [key: string]: InputType[] };
}

interface ObjectArrayInput {
   type: "object-array";
}

interface ObjectStringInput {
   type: "object-string";
}

interface InputInput {
   type: "input-input";
}

interface JSONInput {
   type: "json";
}

export type InputType = BasicInput &
   (
      | SliderInput
      | TextInput
      | NumberInput
      | ColorInput
      | UrlInput
      | TextAreaInput
      | CheckboxInput
      | TextArrayInput
      | SelectInput
      | RadioInput
      | InputGroup
      | ConditionalInput
      | ObjectArrayInput
      | ObjectStringInput
      | InputInput
      | JSONInput
   );

interface Model {
   type: "model";
   feature_description: { [key: string]: string };
   ipynb_json: string;
   dataset: string;
   git_link: string[];
   kaggle_dataset?: string;
   api?: string;
   most_used_packages: string[];
   inputs?: InputType[];
   examples: {
      [key: string]: number | string;
   }[];
   models?: {
      api: string;
      inputs: InputType[];
      examples: {
         [key: string]: number | string;
      }[];
      title: string;
   }[];
}

interface Analysis {
   type: "analysis";
   feature_description: { [key: string]: string };
   ipynb_json: string;
   dataset: string;
   git_link: string[];
   kaggle_dataset?: string;
   most_used_packages: string[];
}

export type Project = BasicInfo &
   (Website | Package | Utility | Model | Analysis);

export type Blog = {
   id: string;
   title: string;
   description: "";
   show_title: boolean;
   fetch_url: string;
   blog_url: string;
   type: "html";
   featured_image: string;
   tags: string[];
};
