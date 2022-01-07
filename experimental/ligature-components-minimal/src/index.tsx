import { render } from 'solid-js/web'
import LigatureInstance from './LigatureInstance'

render(() =>
  <>
    <LigatureInstance datasets={["hello", "test"]} />
  </>,
  document.getElementById('root') as HTMLElement
)
