import { css } from "lit";

export const style = css`
@font-face {
  font-family: 'Comfortaa';
  src: url('/font/Comfortaa-VariableFont_wght.ttf');
}

@font-face {
  font-family: 'Raleway';
  src: url('/font/Raleway-VariableFont_wght.ttf');
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Comfortaa';
}

p, div {
  font-family: 'Raleway';
}
`