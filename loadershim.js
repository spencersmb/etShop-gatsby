import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

const path = require("path")
const dotEnvPath = path.resolve(`./.env.${process.env.NODE_ENV}`)
require("dotenv").config({
  path: dotEnvPath
})
configure({ adapter: new Adapter() })

global.___loader = {
  enqueue: jest.fn(),
  warn: jest.fn()
}

jest.spyOn(global.console, "warn").mockImplementation(() => jest.fn())

