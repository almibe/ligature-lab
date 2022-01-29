import { render } from 'solid-js/web'
import LigatureEditor from './src/LigatureEditor'
import './src/ligature-components.css'

render(() =>
  <>
    <LigatureEditor></LigatureEditor>   
  </>,
  document.getElementById('root') as HTMLElement
)
