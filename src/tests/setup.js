import { GlobalWindow } from 'happy-dom'

const window = new GlobalWindow()
global.document = window.document
global.window = window
global.navigator = window.navigator