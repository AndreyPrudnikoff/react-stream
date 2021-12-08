import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { useHistory } from 'react-router-dom'
import { Provider, useDispatch } from "react-redux";
import store from '../src/store'
import Error from '../src/Error.js'

test('Links didn\'t change', () => {
    const component = renderer.create(
        <Provider store={store}><Error/></Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

afterEach(cleanup);

it('Error component exist', () => {
    const component = render(
        <Provider store={store}><Error/></Provider>
    );
});