import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Content from './Content';
import LaunchList from '../LaunchList/LaunchList';

configure({adapter: new Adapter()});

describe('<Content />', () => {
  it('should render <Header />', () => {
    expect(shallow(<Content/>).contains(<LaunchList/>)).toEqual(true);
  })
})