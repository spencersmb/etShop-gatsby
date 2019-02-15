import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.___loader = {
  enqueue: jest.fn(),
  warn: jest.fn()
}

jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
