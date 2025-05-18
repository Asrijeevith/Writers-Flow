import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default compat.config({
  extends: ["next/core-web-vitals"], // Keep Next.js recommended rules
  rules: {
    "no-console": "off",
    "no-undef": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});



