import { render } from 'solid-js/web'
import { LigatureEditor } from './src/index'

render(() =>
  <>
    <LigatureEditor></LigatureEditor>   
  </>,
  document.getElementById('root') as HTMLElement
)
