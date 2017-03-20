import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

// Componentry
import Foo from '../../src/Foo';
import SearchBar from '../../src/SearchBar';

// Styles
import styles from '../../src/styles.scss';

// Setup
// Convenience method, especially useful when your component has alot of parameters
const makeShallow = () => shallow(<Foo />);
const makeMounted = () => mount(<Foo />)

// Test suite
// Don't use es6 Arrow functions because it has some scoping confusion (with 'this')
describe("Testing Component", function() {

  it("Contains an element with class 'foo' - find elements", function() {
    expect(makeShallow().is(`.${styles.foo}`)).to.equal(true);
  });

  it("Contains only a single element with class 'foo' - counting elements", function() {
    expect(makeShallow().find(`.${styles.foo}`).length).to.equal(1);
  });

  it('Passes loading:true to ImageDisplay - prop checking',  function() {
    const wrapper = makeShallow();
    const imageDisplay = wrapper.find('ImageDisplay');
    expect(imageDisplay.prop('loading')).to.equal(true);
  });

  it('Reach search for cats - spy on methods',  function() {
    const onSearchStub = sinon.spy();
    const wrapper = shallow(<SearchBar onSearch={onSearchStub}/>);
    const imageDisplay = wrapper.find('ImageDisplay');
    const searchField = wrapper.find('input');
    const event1 = {target: {value: 'cat'}};
    const event2 = {target: {value: 'cats'}};

    searchField.simulate('change', event1);
    searchField.simulate('change', event2);

    expect(onSearchStub.calledTwice).to.equal(true);
  });

  it('Stub Single function', function(done){

    // Note - Its easiest to stub the function in the react component than to actually try to intercept Calls and stuff
    // YOU MUST STUB the function before you create the component!
    // REMEMBER not to use ARROW function else the "this" gets screwed and u cant use setState
    // We make a promise here so we can catch it later down the test
    var getGifPromise;

    sinon.stub(Foo.prototype, '_handleSearch', function(){
      this.setState({loading: true});

      // Mocked Sample response as if API was called
      const mockedGifResponse = {
        url: mockedUrl,
        width: 100,
        sourceUrl: mockedUrl
      };

      // Fake a promise
      getGifPromise = new Promise(function(resolve, reject) {
        setTimeout(()=>{
          resolve(mockedGifResponse);
        },1500);
      });

    });

    // Render AFTER you stub
    const foo = makeMounted();
    const mockedUrl = 'https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

    // Find SearchBar and simulate change
    const searchField = foo.find('SearchBar');
    expect(searchField.length).to.equal(1);
    searchField.simulate('change', {target: {value: 'cat'}});

    // Try to make it as real as possible, We put the result down here so its a bit more legible as a test story
    getGifPromise.then((gif) => {
      foo.setState({ loading: false, gif: gif , mockedUrl});
      expect(foo.state().gif.url).to.equal(mockedUrl);
      done();
    }).catch((error) => {
      console.log("getGifPromise rejected", error);
      done();
    });

  });

  xit("Ignored test", function(){
    // This is ignored - Used to test CI When fail
    expect(false).to.equal(true);
  })
});
