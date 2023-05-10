import "styled-components";
declare module "styled-components/native" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      accent: string;
    };
  }
}
